import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";

export function usePassiveIncome() {
  const { cps, incrementCoins } = useGameStore();

  useEffect(() => {
    if (cps <= 0) return;

    const interval = setInterval(() => {
      incrementCoins(cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps, incrementCoins]);
}
