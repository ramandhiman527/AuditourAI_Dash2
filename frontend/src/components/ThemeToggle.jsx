import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";

const ThemeToggle = ({
  className = "",
  size = "default",
  variant = "ghost",
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      style={{
        backgroundColor: isDark
          ? "var(--card-background)"
          : "var(--card-background)",
        border: "1px solid var(--border-light)",
        color: "var(--text-primary)",
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-4 h-4 transition-all duration-500 absolute ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
          style={{ color: "var(--primary-green)" }}
        />

        {/* Moon Icon */}
        <Moon
          className={`w-4 h-4 transition-all duration-500 absolute ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
          style={{ color: "var(--primary-green)" }}
        />
      </div>

      {/* Animated background */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20"
            : "bg-gradient-to-r from-yellow-100/50 to-orange-100/50"
        }`}
        style={{ opacity: 0.3 }}
      />
    </Button>
  );
};

export default ThemeToggle;
