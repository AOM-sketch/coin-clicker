import { CoinButton } from "@/components/CoinButton";
import { FloatPop } from "@/components/FloatPop";
import { Layout } from "@/components/Layout";
import { UpgradeShop } from "@/components/UpgradeShop";
import { useGameSync } from "@/hooks/useGameSync";
import { usePassiveIncome } from "@/hooks/usePassiveIncome";
import { useGameStore } from "@/store/gameStore";
import type { FloatPopItem } from "@/types/game";
import { formatCoins } from "@/utils/formatCoins";
import { useCallback, useState } from "react";

export default function GamePage() {
  usePassiveIncome();
  const { isLoading } = useGameSync();

  const coins = useGameStore((s) => s.coins);
  const cps = useGameStore((s) => s.cps);
  const [floatPops, setFloatPops] = useState<FloatPopItem[]>([]);

  const handleCoinClick = useCallback((x: number, y: number, value: number) => {
    const id = `fp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setFloatPops((prev) => [...prev.slice(-12), { id, x, y, value }]);
  }, []);

  const handlePopDone = useCallback((id: string) => {
    setFloatPops((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <Layout sidebar={<UpgradeShop />}>
      <div
        className="relative flex flex-col items-center justify-center gap-6 w-full select-none"
        data-ocid="game.page"
      >
        {/* Float pops layer */}
        <div className="pointer-events-none absolute inset-0 overflow-visible z-20">
          {floatPops.map((pop) => (
            <FloatPop key={pop.id} item={pop} onDone={handlePopDone} />
          ))}
        </div>

        {/* Coin stats block */}
        <div
          className="flex flex-col items-center gap-1 text-center"
          data-ocid="game.stats"
        >
          {isLoading ? (
            <div
              className="h-14 w-40 bg-muted/50 rounded-lg animate-pulse"
              data-ocid="game.loading_state"
            />
          ) : (
            <>
              <p className="text-muted-foreground uppercase tracking-widest text-xs font-display font-semibold">
                Total Coins
              </p>
              <p className="font-display font-extrabold text-5xl text-foreground tabular-nums leading-none">
                <span className="mr-2 text-primary">🪙</span>
                {formatCoins(coins)}
              </p>
              <p className="font-body text-sm text-secondary font-semibold mt-1">
                {cps > 0 ? (
                  <span>+{formatCoins(cps)} coins/sec</span>
                ) : (
                  <span className="text-muted-foreground">
                    Buy upgrades to earn passively
                  </span>
                )}
              </p>
            </>
          )}
        </div>

        {/* Coin */}
        <CoinButton onCoinClick={handleCoinClick} />

        {/* Hint */}
        <p className="text-muted-foreground text-xs font-body animate-pulse">
          Tap the coin to earn!
        </p>
      </div>
    </Layout>
  );
}
