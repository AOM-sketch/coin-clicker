import { computeClickValue } from "@/constants/upgrades";
import { useGameStore } from "@/store/gameStore";
import { useCallback, useRef, useState } from "react";

interface CoinButtonProps {
  onCoinClick: (x: number, y: number, value: number) => void;
}

export function CoinButton({ onCoinClick }: CoinButtonProps) {
  const { upgrades, incrementCoins } = useGameStore();
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    { id: string; x: number; y: number }[]
  >([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = computeClickValue(upgrades);
      incrementCoins(value);

      // Float pop position (relative to viewport)
      const rect = btnRef.current?.getBoundingClientRect();
      const popX = rect ? rect.left + rect.width / 2 : e.clientX;
      const popY = rect ? rect.top + rect.height * 0.2 : e.clientY - 80;
      onCoinClick(popX, popY, value);

      // Ripple inside coin
      const btnRect = btnRef.current?.getBoundingClientRect();
      if (btnRect) {
        const rx = e.clientX - btnRect.left;
        const ry = e.clientY - btnRect.top;
        const id = `r-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setRipples((prev) => [...prev.slice(-4), { id, x: rx, y: ry }]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
      }

      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 120);
    },
    [upgrades, incrementCoins, onCoinClick],
  );

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label="Click coin to earn coins"
      data-ocid="game.coin_button"
      className={[
        "relative rounded-full overflow-hidden cursor-pointer",
        "w-52 h-52 sm:w-64 sm:h-64 lg:w-[20rem] lg:h-[20rem]",
        "transition-transform duration-100 ease-out",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/60",
        "active:scale-95 hover:scale-105",
        isPressed ? "scale-95" : "scale-100",
        "pulse-glow",
      ].join(" ")}
      style={{
        background:
          "radial-gradient(circle at 38% 35%, oklch(0.88 0.22 68), oklch(0.7 0.2 50) 55%, oklch(0.5 0.18 45))",
        boxShadow:
          "0 0 60px oklch(0.7 0.2 50 / 0.45), 0 0 120px oklch(0.7 0.2 50 / 0.2), inset 0 4px 16px oklch(0.92 0.1 60 / 0.3), inset 0 -4px 12px oklch(0.4 0.12 40 / 0.4)",
      }}
    >
      {/* Highlight sheen */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 30%, oklch(1 0 0 / 0.18) 0%, transparent 60%)",
        }}
      />

      {/* Coin face — large emoji + label */}
      <span className="absolute inset-0 flex flex-col items-center justify-center select-none pointer-events-none gap-1">
        <span
          aria-hidden="true"
          style={{ fontSize: "clamp(4rem, 14vw, 7rem)", lineHeight: 1 }}
        >
          🪙
        </span>
        <span
          className="font-display font-extrabold tracking-widest uppercase"
          style={{
            fontSize: "clamp(0.75rem, 2.5vw, 1.1rem)",
            color: "oklch(0.45 0.15 45)",
            textShadow: "0 2px 4px oklch(0.3 0.1 40 / 0.5)",
          }}
        >
          CLICK
        </span>
      </span>

      {/* Click ripple effects */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: 12,
            height: 12,
            marginLeft: -6,
            marginTop: -6,
            background: "oklch(0.92 0.1 60 / 0.5)",
            animation: "coin-ripple 0.6s ease-out forwards",
          }}
        />
      ))}
    </button>
  );
}
