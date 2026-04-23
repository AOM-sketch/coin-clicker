import { computeCPS } from "@/constants/upgrades";
import type { GameState } from "@/types/game";
import { create } from "zustand";

interface GameStore {
  coins: number;
  upgrades: number[];
  lastSaveTime: number;
  cps: number;

  setCoins: (coins: number) => void;
  setUpgrades: (upgrades: number[]) => void;
  incrementCoins: (amount: number) => void;
  updateCPS: () => void;
  setGameState: (state: Partial<GameState>) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  coins: 0,
  upgrades: [0, 0, 0, 0, 0],
  lastSaveTime: Date.now(),
  cps: 0,

  setCoins: (coins) => set({ coins }),

  setUpgrades: (upgrades) => {
    const cps = computeCPS(upgrades);
    set({ upgrades, cps });
  },

  incrementCoins: (amount) => {
    set((state) => ({ coins: state.coins + amount }));
  },

  updateCPS: () => {
    const cps = computeCPS(get().upgrades);
    set({ cps });
  },

  setGameState: (partial) => {
    const current = get();
    const upgrades = partial.upgrades ?? current.upgrades;
    const cps = computeCPS(upgrades);
    set({
      coins: partial.coins ?? current.coins,
      upgrades,
      lastSaveTime: partial.lastSaveTime ?? current.lastSaveTime,
      cps,
    });
  },
}));
