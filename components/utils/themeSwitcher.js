import { useEffect, useState } from "react";

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
    <button onClick={toggleTheme}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
export default ThemeSwitcher;
