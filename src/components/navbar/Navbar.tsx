"use client";

import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed bg-white dark:bg-bgColor w-[98%] h-12.5 border z-99 rounded-full top-5 left-1/2 -translate-x-1/2 shadow-sm dark:shadow-lg flex items-center justify-between px-6 transition-colors">
      <div className="text-lg font-semibold text-black dark:text-white">
        JSON Visualizer
      </div>

      <div className="flex items-center gap-3">
        {theme === "light" ? (
          <Sun className="w-4 h-4 text-yellow-500" />
        ) : (
          <Moon className="w-4 h-4 text-blue-400" />
        )}
        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      </div>
    </div>
  );
};

export default Navbar;