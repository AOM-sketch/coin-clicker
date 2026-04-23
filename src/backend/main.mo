import GameMixin "mixins/game-api";
import Types "types/game";

actor {
  // Stable game state — single global anonymous state
  var coins : { var v : Nat } = { var v = 0 };
  var upgrades : { var v : [Nat] } = { var v = [] };
  var lastSaveTime : { var v : Types.Timestamp } = { var v = 0 };
  var initialized : { var v : Bool } = { var v = false };

  include GameMixin(coins, upgrades, lastSaveTime, initialized);
};
