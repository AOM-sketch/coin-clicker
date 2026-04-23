import type { UpgradeDefinition } from "@/types/game";

export const UPGRADES: UpgradeDefinition[] = [
  {
    id: 0,
    name: "Lucky Finger",
    description: "A quick tap for +1 extra coin per click.",
    baseCost: 10,
    costScaling: 1.5,
    clickBonus: 1,
    cpsBonus: 0,
    icon: "👆",
  },
  {
    id: 1,
    name: "Auto-Clicker",
    description: "A robot arm clicks so you don't have to.",
    baseCost: 100,
    costScaling: 1.6,
    clickBonus: 0,
    cpsBonus: 2,
    icon: "🤖",
  },
  {
    id: 2,
    name: "Coin Multiplier",
    description: "Doubles the value of every click.",
    baseCost: 500,
    costScaling: 1.8,
    clickBonus: 5,
    cpsBonus: 0,
    icon: "✖️",
  },
  {
    id: 3,
    name: "Turbo Tap",
    description: "Overclocked auto-clicker at warp speed.",
    baseCost: 2000,
    costScaling: 1.9,
    clickBonus: 0,
    cpsBonus: 15,
    icon: "⚡",
  },
  {
    id: 4,
    name: "Arcade Power",
    description: "Channel pure arcade energy for massive CPS.",
    baseCost: 10000,
    costScaling: 2.0,
    clickBonus: 10,
    cpsBonus: 50,
    icon: "🕹️",
  },
];

export const BASE_CLICK_VALUE = 1;

export function getUpgradeCost(
  upgrade: UpgradeDefinition,
  level: number,
): number {
  return Math.floor(upgrade.baseCost * upgrade.costScaling ** level);
}

export function computeClickValue(upgradeLevels: number[]): number {
  return upgradeLevels.reduce((total, level, idx) => {
    const def = UPGRADES[idx];
    return def ? total + def.clickBonus * level : total;
  }, BASE_CLICK_VALUE);
}

export function computeCPS(upgradeLevels: number[]): number {
  return upgradeLevels.reduce((total, level, idx) => {
    const def = UPGRADES[idx];
    return def ? total + def.cpsBonus * level : total;
  }, 0);
}
