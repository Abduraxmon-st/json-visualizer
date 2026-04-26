"use client";

import { useTheme } from "@/context/ThemeContext";
import { localeLabels, localeNames, locales, localizePathname, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Switch } from "@/components/ui/switch";
import { useSidebar } from "@/context/SidebarContext";
import { useWorkspaceView, type WorkspaceView } from "@/context/ViewContext";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type NavbarDictionary = Dictionary["navbar"];

interface NavbarProps {
  dictionary: NavbarDictionary;
  locale: Locale;
}

const Navbar = ({ dictionary, locale }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const isSidebarOpen = useSidebar((state) => state.isOpen);
  const activeView = useWorkspaceView((state) => state.activeView);
  const setActiveView = useWorkspaceView((state) => state.setActiveView);
  const pathname = usePathname();
  const viewOptions: { label: string; value: WorkspaceView }[] = [
    { label: dictionary.visualizeViewLabel, value: "visualize" },
    { label: dictionary.typescriptViewLabel, value: "typescript" },
  ];

  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);

  return (
    <div
      className={cn(
        "fixed right-5 top-5 z-99 flex h-max items-center justify-between rounded-full border bg-white py-2 pl-4 pr-2 shadow-sm transition-all duration-300 dark:bg-bgColor dark:shadow-lg",
        isSidebarOpen
          ? "left-[calc(1rem+min(21.75rem,calc(100vw-1.5rem))+1.625rem)]"
          : "left-[calc(1rem+3.5rem+1.25rem)]",
      )}
    >
      <div className="text-lg font-semibold text-black dark:text-white">
        {dictionary.brand}
      </div>

      <div className="flex items-center gap-3">
        <div
          aria-label={dictionary.viewToggleLabel}
          className="flex items-center rounded-full border border-border bg-background/70 p-0.5"
          role="group"
        >
          {viewOptions.map((option) => {
            const isActive = option.value === activeView;

            return (
              <button
                aria-pressed={isActive}
                className={cn(
                  "h-7 rounded-full px-3 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
                key={option.value}
                onClick={() => setActiveView(option.value)}
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {theme === "light" ? (
          <Sun aria-label={dictionary.themeLightLabel} className="w-4 h-4 text-yellow-500" />
        ) : (
          <Moon aria-label={dictionary.themeDarkLabel} className="w-4 h-4 text-blue-400" />
        )}
        <Switch
          aria-label={dictionary.themeToggleLabel}
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
        />
        <nav
          aria-label={dictionary.languageLabel}
          className="flex items-center rounded-full border border-border bg-background/70 p-0.5"
        >
          {locales.map((nextLocale) => {
            const isActive = nextLocale === locale;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-2 py-1 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
                href={localizePathname(pathname, nextLocale)}
                key={nextLocale}
                title={localeNames[nextLocale]}
              >
                {localeLabels[nextLocale]}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
