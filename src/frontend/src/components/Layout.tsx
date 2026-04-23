import { Header } from "@/components/Header";
import type { ReactNode } from "react";

interface LayoutProps {
  sidebar?: ReactNode;
  children: ReactNode;
}

export function Layout({ children, sidebar }: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Central content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 min-w-0">
          {children}
        </main>

        {/* Right sidebar — fixed on desktop, stacks below on mobile */}
        {sidebar && (
          <aside
            className="
              w-full
              lg:w-80 lg:min-w-[18rem] lg:max-w-xs
              bg-card border-t lg:border-t-0 lg:border-l border-border
              overflow-y-auto
              max-h-[45vh] lg:max-h-none
              order-last
            "
            data-ocid="sidebar"
          >
            {sidebar}
          </aside>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-3 px-4 text-center text-xs text-muted-foreground">
        © {year}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-colors duration-200"
        >
          Built with love using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
