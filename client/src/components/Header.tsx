import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">CodeMate AI</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#tips"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-tips"
            >
              Tips
            </a>
            <a
              href="#languages"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-languages"
            >
              Languages
            </a>
            <a
              href="#saved"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-testid="link-saved"
            >
              Saved Tips
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
            <Button data-testid="button-generate-tip" className="hidden sm:flex">
              Generate Tip
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
