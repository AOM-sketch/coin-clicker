import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { formatCoins } from "@/utils/formatCoins";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const { theme, setTheme } = useTheme();
  const coins = useGameStore((s) => s.coins);
  const cps = useGameStore((s) => s.cps);

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
      data-ocid="header"
    >
      <div className="flex items-center justify-between px-4 h-14 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            🕹️
          </span>
          <span className="font-display font-bold text-lg tracking-widest uppercase text-primary">
            Arcade Clicker
          </span>
        </div>

        {/* Coin stats */}
        <div
          className="flex items-center gap-4 font-display"
          data-ocid="header.coin_stats"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-lg" aria-hidden="true">
              🪙
            </span>
            <span className="text-foreground font-bold text-base tabular-nums">
              {formatCoins(coins)}
            </span>
          </div>
          {cps > 0 && (
            <div className="hidden sm:flex items-center gap-1 text-secondary text-sm font-medium">
              <span>+{formatCoins(cps)}</span>
              <span className="text-muted-foreground">/sec</span>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          data-ocid="header.theme_toggle"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
