import type { FloatPopItem } from "@/types/game";
import { formatCoins } from "@/utils/formatCoins";
import { useEffect } from "react";

interface FloatPopProps {
  item: FloatPopItem;
  onDone: (id: string) => void;
}

export function FloatPop({ item, onDone }: FloatPopProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDone(item.id), 800);
    return () => clearTimeout(timer);
  }, [item.id, onDone]);

  return (
    <span
      className="float-pop fixed pointer-events-none z-50 font-display font-extrabold select-none"
      aria-hidden="true"
      style={{
        left: item.x,
        top: item.y,
        fontSize: "clamp(1.25rem, 3vw, 2rem)",
        color: "oklch(0.75 0.18 180)",
        textShadow:
          "0 0 12px oklch(0.62 0.16 190 / 0.8), 0 2px 8px oklch(0.1 0 0 / 0.6)",
        letterSpacing: "0.02em",
      }}
    >
      +{formatCoins(item.value)}
    </span>
  );
}
