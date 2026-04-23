import Common "common";

module {
  public type Timestamp = Common.Timestamp;

  public type GameState = {
    coins : Nat;
    upgrades : [Nat];
    lastSaveTime : Timestamp;
  };

  public type BuyUpgradeResult = {
    #ok : { coins : Nat; upgrades : [Nat] };
    #err : Text;
  };
};
