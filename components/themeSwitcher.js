"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { moon, sun } from "../lib/svg";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only runs on the client side
  useEffect(() => {
    setIsMounted(true); // Mark as mounted to prevent SSR mismatch issues
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Prevent rendering until mounted to avoid hydration mismatches
  if (!isMounted) return null;

  return (
    <button onClick={toggleTheme} className="flex">
      {theme === "dark" ? sun : moon}
    </button>
  );
};

export default ThemeSwitcher;
