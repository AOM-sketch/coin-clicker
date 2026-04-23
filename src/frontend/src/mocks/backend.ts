import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getState: async () => ({
    coins: BigInt(1234),
    lastSaveTime: BigInt(Date.now()),
    upgrades: [BigInt(2), BigInt(1), BigInt(0), BigInt(3), BigInt(1)],
  }),
  clickCoin: async () => BigInt(1250),
  buyUpgrade: async (_upgradeId: bigint) => ({
    __kind__: "ok" as const,
    ok: {
      coins: BigInt(1000),
      upgrades: [BigInt(2), BigInt(1), BigInt(0), BigInt(3), BigInt(1)],
    },
  }),
  saveState: async (_newCoins: bigint, _newUpgrades: Array<bigint>) => undefined,
};
