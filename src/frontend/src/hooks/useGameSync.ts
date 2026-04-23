import { createActor } from "@/backend";
import type { backendInterface } from "@/backend";
import { useGameStore } from "@/store/gameStore";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const SAVE_INTERVAL_MS = 10_000;

export function useGameSync() {
  const { actor, isFetching } = useActor<backendInterface>(createActor);
  const { setGameState, coins, upgrades } = useGameStore();
  const queryClient = useQueryClient();
  const lastSavedRef = useRef<{ coins: number; upgrades: number[] }>({
    coins,
    upgrades,
  });

  // Load state from backend on mount
  const { isLoading, isError } = useQuery({
    queryKey: ["gameState"],
    queryFn: async () => {
      if (!actor) return null;
      const state = await actor.getState();
      const coinsNum = Number(state.coins);
      const upgradesArr = state.upgrades.map(Number);
      setGameState({
        coins: coinsNum,
        upgrades: upgradesArr,
        lastSaveTime: Number(state.lastSaveTime),
      });
      lastSavedRef.current = { coins: coinsNum, upgrades: upgradesArr };
      return state;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
    retry: 2,
  });

  // Save mutation
  const { mutate: saveState } = useMutation({
    mutationFn: async ({ c, u }: { c: number; u: number[] }) => {
      if (!actor) return;
      await actor.saveState(
        BigInt(Math.floor(c)),
        u.map((v) => BigInt(v)),
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["gameState"] });
    },
  });

  // Periodic auto-save
  useEffect(() => {
    const interval = setInterval(() => {
      const currentCoins = useGameStore.getState().coins;
      const currentUpgrades = useGameStore.getState().upgrades;
      const last = lastSavedRef.current;
      const changed =
        currentCoins !== last.coins ||
        currentUpgrades.some((v, i) => v !== last.upgrades[i]);
      if (changed && actor) {
        saveState({ c: currentCoins, u: currentUpgrades });
        lastSavedRef.current = {
          coins: currentCoins,
          upgrades: currentUpgrades,
        };
      }
    }, SAVE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [actor, saveState]);

  return { isLoading, isError };
}
