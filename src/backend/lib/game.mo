import Array "mo:core/Array";
import Time "mo:core/Time";
import Types "../types/game";

module {
  public type GameState = Types.GameState;
  public type BuyUpgradeResult = Types.BuyUpgradeResult;

  // Base costs for the 5 upgrades (IDs 0..4):
  //   0: Click Boost (+10% click value)   base 50
  //   1: Auto-Clicker (1 CPS)             base 100
  //   2: Multiplier 2x                    base 500
  //   3: Super Auto-Clicker (5 CPS)       base 1000
  //   4: Mega Multiplier 10x              base 5000
  let UPGRADE_COUNT : Nat = 5;
  let BASE_COSTS : [Nat] = [50, 100, 500, 1000, 5000];

  /// Compute the current cost for an upgrade given how many are already owned.
  /// cost = base * 1.15^owned  (integer approximation using *115/100 per step)
  public func upgradeCost(upgradeId : Nat, owned : Nat) : Nat {
    if (upgradeId >= UPGRADE_COUNT) {
      return 0;
    };
    var cost = BASE_COSTS[upgradeId];
    var i = 0;
    while (i < owned) {
      cost := cost * 115 / 100;
      i += 1;
    };
    cost;
  };

  /// Return the current game state; if not initialized, return defaults.
  public func getState(
    coins : Nat,
    upgrades : [Nat],
    lastSaveTime : Types.Timestamp,
    initialized : Bool,
  ) : GameState {
    if (not initialized) {
      {
        coins = 0;
        upgrades = Array.repeat(0, UPGRADE_COUNT);
        lastSaveTime = Time.now();
      };
    } else {
      { coins; upgrades; lastSaveTime };
    };
  };

  /// Persist coins and upgrade counts; returns updated state with current timestamp.
  public func saveState(
    newCoins : Nat,
    newUpgrades : [Nat],
  ) : { coins : Nat; upgrades : [Nat]; lastSaveTime : Types.Timestamp } {
    { coins = newCoins; upgrades = newUpgrades; lastSaveTime = Time.now() };
  };

  /// Increment the coin counter by 1 and return the new total.
  public func clickCoin(coins : Nat) : Nat {
    coins + 1;
  };

  /// Attempt to purchase an upgrade by ID. Validates the ID and checks affordability.
  public func buyUpgrade(
    upgradeId : Nat,
    coins : Nat,
    upgrades : [Nat],
    upgradeCosts : [Nat],
  ) : BuyUpgradeResult {
    if (upgradeId >= UPGRADE_COUNT) {
      return #err("Invalid upgrade ID");
    };
    let cost = upgradeCosts[upgradeId];
    if (coins < cost) {
      return #err("Not enough coins");
    };
    let newCoins = coins - cost;
    // Build updated upgrades array with the purchased upgrade incremented
    let newUpgrades = upgrades.mapEntries(func(v, i) {
      if (i == upgradeId) { v + 1 } else { v }
    });
    #ok({ coins = newCoins; upgrades = newUpgrades });
  };
};
