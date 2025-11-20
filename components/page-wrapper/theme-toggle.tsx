"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <SidebarMenuItem className="flex flex-row items-center gap-2 justify-between">
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start gap-2"
        asChild
      >
        <SidebarMenuButton onClick={toggleTheme} tooltip="Theme">
          <span className="text-sm font-medium">
            <Sun className="h-4 w-4 transition-all dark:hidden" />
            <Moon className="h-4 w-4 hidden transition-all dark:block" />
          </span>

          <span>Theme</span>
        </SidebarMenuButton>
      </Button>
    </SidebarMenuItem>
  );
};

export default ThemeToggle;
