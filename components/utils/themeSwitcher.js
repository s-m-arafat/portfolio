import { useEffect, useState } from "react";
import Image from "next/image";
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
      <Image
        alt="theme icon"
        width={30}
        height={30}
        src={isDarkMode ? "/icons/sun.png" : "/icons/moon.png"}
      />
    </button>
  );
};
export default ThemeSwitcher;
