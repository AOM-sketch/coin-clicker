import { UpgradeItem } from "@/components/UpgradeItem";
import { UPGRADES } from "@/constants/upgrades";
import { useGameStore } from "@/store/gameStore";

export function UpgradeShop() {
  const upgrades = useGameStore((s) => s.upgrades);

  return (
    <div className="flex flex-col h-full" data-ocid="shop.panel">
      <div className="px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0">
        <h2 className="font-display font-bold text-base tracking-widest uppercase text-foreground">
          Shop Upgrades
        </h2>
      </div>

      <div
        className="flex-1 overflow-y-auto p-3 flex flex-col gap-2"
        data-ocid="shop.list"
      >
        {UPGRADES.map((upgrade, idx) => (
          <UpgradeItem
            key={upgrade.id}
            upgrade={upgrade}
            owned={upgrades[upgrade.id] ?? 0}
            index={idx + 1}
          />
        ))}
      </div>
    </div>
  );
}
