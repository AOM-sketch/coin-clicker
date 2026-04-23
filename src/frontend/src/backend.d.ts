import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface GameState {
    coins: bigint;
    lastSaveTime: Timestamp;
    upgrades: Array<bigint>;
}
export type BuyUpgradeResult = {
    __kind__: "ok";
    ok: {
        coins: bigint;
        upgrades: Array<bigint>;
    };
} | {
    __kind__: "err";
    err: string;
};
export interface backendInterface {
    buyUpgrade(upgradeId: bigint): Promise<BuyUpgradeResult>;
    clickCoin(): Promise<bigint>;
    getState(): Promise<GameState>;
    saveState(newCoins: bigint, newUpgrades: Array<bigint>): Promise<void>;
}
