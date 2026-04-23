import Array "mo:core/Array";
import GameLib "../lib/game";
import Types "../types/game";

mixin (
  coins : { var v : Nat },
  upgrades : { var v : [Nat] },
  lastSaveTime : { var v : Types.Timestamp },
  initialized : { var v : Bool },
) {
  /// Return the current game state. Returns default (0 coins, empty upgrades) if not yet saved.
  public query func getState() : async Types.GameState {
    GameLib.getState(coins.v, upgrades.v, lastSaveTime.v, initialized.v);
  };

  /// Overwrite the full game state (called on debounced saves from the frontend).
  public func saveState(newCoins : Nat, newUpgrades : [Nat]) : async () {
    let saved = GameLib.saveState(newCoins, newUpgrades);
    coins.v := saved.coins;
    upgrades.v := saved.upgrades;
    lastSaveTime.v := saved.lastSaveTime;
    initialized.v := true;
  };

  /// Increment the global coin counter by 1 and return the new total.
  public func clickCoin() : async Nat {
    let newCoins = GameLib.clickCoin(coins.v);
    coins.v := newCoins;
    if (not initialized.v) {
      upgrades.v := Array.repeat(0, 5);
      initialized.v := true;
    };
    newCoins;
  };

  /// Purchase upgrade identified by upgradeId. Returns updated coins/upgrades or an error.
  public func buyUpgrade(upgradeId : Nat) : async Types.BuyUpgradeResult {
    // Compute current costs for all upgrades
    let upgradeCosts = Array.tabulate(5, func(i : Nat) : Nat {
      GameLib.upgradeCost(i, upgrades.v[i])
    });
    let result = GameLib.buyUpgrade(upgradeId, coins.v, upgrades.v, upgradeCosts);
    switch (result) {
      case (#ok(updated)) {
        coins.v := updated.coins;
        upgrades.v := updated.upgrades;
        lastSaveTime.v := GameLib.saveState(updated.coins, updated.upgrades).lastSaveTime;
      };
      case (#err(_)) {};
    };
    result;
  };
};
