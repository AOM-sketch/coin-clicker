import GamePage from "@/pages/GamePage";
import { ThemeProvider } from "next-themes";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <GamePage />
    </ThemeProvider>
  );
}
