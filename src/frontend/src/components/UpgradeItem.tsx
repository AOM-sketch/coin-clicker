import { Button } from "@/components/ui/button";
import { getUpgradeCost } from "@/constants/upgrades";
import { useGameStore } from "@/store/gameStore";
import type { UpgradeDefinition } from "@/types/game";
import { formatCoins } from "@/utils/formatCoins";
import { useCallback, useEffect, useRef, useState } from "react";

interface UpgradeItemProps {
  upgrade: UpgradeDefinition;
  owned: number;
  index: number;
}

export function UpgradeItem({ upgrade, owned, index }: UpgradeItemProps) {
  const coins = useGameStore((s) => s.coins);
  const { incrementCoins, setUpgrades, upgrades } = useGameStore();
  const [glowing, setGlowing] = useState(false);
  const prevOwned = useRef(owned);

  const cost = getUpgradeCost(upgrade, owned);
  const canAfford = coins >= cost;

  // Glow when owned count increases
  useEffect(() => {
    if (owned > prevOwned.current) {
      setGlowing(true);
      const t = setTimeout(() => setGlowing(false), 700);
      prevOwned.current = owned;
      return () => clearTimeout(t);
    }
    prevOwned.current = owned;
  }, [owned]);

  const handleBuy = useCallback(() => {
    if (coins < cost) return;
    incrementCoins(-cost);
    const next = [...upgrades];
    next[upgrade.id] = (next[upgrade.id] ?? 0) + 1;
    setUpgrades(next);
  }, [coins, cost, upgrade.id, upgrades, incrementCoins, setUpgrades]);

  const statLabel =
    upgrade.cpsBonus > 0
      ? `+${upgrade.cpsBonus} CPS`
      : `+${upgrade.clickBonus}/click`;

  return (
    <div
      data-ocid={`shop.item.${index}`}
      className={[
        "rounded-lg border transition-all duration-200 p-3",
        "bg-card border-border",
        glowing
          ? "border-secondary shadow-[0_0_16px_oklch(0.62_0.16_190/0.55)] scale-[1.01]"
          : "hover:border-border/80 hover:bg-muted/30",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center text-xl flex-shrink-0 bg-muted border border-border"
          aria-hidden="true"
        >
          {upgrade.icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display font-bold text-sm uppercase tracking-wide text-foreground">
              {upgrade.name}
            </span>
            {owned > 0 && (
              <span
                className="text-xs font-mono font-semibold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded"
                data-ocid={`shop.owned.${index}`}
              >
                Lvl {owned}
              </span>
            )}
          </div>
          <p className="text-muted-foreground text-xs truncate mt-0.5">
            {upgrade.description}
          </p>
          <p className="text-secondary text-xs font-semibold mt-0.5">
            {statLabel}
          </p>
        </div>
      </div>

      {/* Cost row */}
      <div className="flex items-center justify-between mt-2.5 gap-2">
        <span className="text-xs text-muted-foreground font-body">
          Cost:{" "}
          <span
            className={
              canAfford
                ? "text-primary font-bold"
                : "text-destructive font-bold"
            }
          >
            {formatCoins(cost)}
          </span>
        </span>
        <Button
          size="sm"
          variant={canAfford ? "default" : "outline"}
          disabled={!canAfford}
          onClick={handleBuy}
          data-ocid={`shop.buy_button.${index}`}
          className={[
            "h-7 px-3 text-xs font-display font-bold tracking-wider uppercase transition-all duration-150",
            canAfford
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_0_10px_oklch(0.62_0.16_190/0.4)]"
              : "opacity-50",
          ].join(" ")}
        >
          Buy [{formatCoins(cost)}]
        </Button>
      </div>
    </div>
  );
}
