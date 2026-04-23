export interface GameState {
  coins: number;
  upgrades: number[]; // indexed by upgrade id, value = quantity owned
  lastSaveTime: number;
  cps: number; // coins per second, derived
}

export interface UpgradeDefinition {
  id: number;
  name: string;
  description: string;
  baseCost: number;
  costScaling: number; // multiplier per level
  clickBonus: number; // flat coins added per click
  cpsBonus: number; // coins per second added
  icon: string; // emoji or icon label
}

export interface FloatPopItem {
  id: string;
  value: number;
  x: number;
  y: number;
}
