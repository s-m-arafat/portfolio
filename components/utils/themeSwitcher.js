import { useEffect, useState } from "react";
import { moon, sun } from "../../lib/svg";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark"); // Use newTheme here
    setIsDarkMode(!isDarkMode);
  };

  return (
    // flex added to avoid extra space below the image
    <button onClick={toggleTheme} className="flex">
      {isDarkMode ? sun : moon}
    </button>
  );
};
export default ThemeSwitcher;
