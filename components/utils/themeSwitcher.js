import { useEffect, useState } from "react";
import Image from "next/image";
const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const sun = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 74 74"
      fill="none"
    >
      <circle cx="37" cy="37" r="18" fill="#FFA500" />
      <circle cx="37" cy="5" r="5" fill="#FFA500" />
      <circle cx="60" cy="14" r="5" fill="#FFA500" />
      <circle cx="69" cy="37" r="5" fill="#FFA500" />
      <circle cx="60" cy="60" r="5" fill="#FFA500" />
      <circle cx="37" cy="69" r="5" fill="#FFA500" />
      <circle cx="14" cy="60" r="5" fill="#FFA500" />
      <circle cx="5" cy="37" r="5" fill="#FFA500" />
      <circle cx="14" cy="14" r="5" fill="#FFA500" />
    </svg>
  );

  const moon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 84 89"
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M79.897 57.9277C74.1318 62.3595 66.8789 65 59 65C40.2222 65 25 50.0015 25 31.5C25 22.5797 28.5386 14.4737 34.3081 8.47036C14.8794 11.451 0 28.2378 0 48.5C0 70.8675 18.1323 89 40.5 89C59.6216 89 75.6484 75.7483 79.897 57.9277Z"
        fill="#151515"
      />
      <path
        d="M43 11V9C43 7.89543 43.8954 7 45 7H47C48.1046 7 49 6.10457 49 5V2C49 0.895431 49.8954 0 51 0H53.5C54.6046 0 55.5 0.89543 55.5 2V5C55.5 6.10457 56.3954 7 57.5 7H60C61.1046 7 62 7.89543 62 9V11C62 12.1046 61.1046 13 60 13H57C55.8954 13 55 13.8954 55 15V17.5C55 18.6046 54.1046 19.5 53 19.5H51C49.8954 19.5 49 18.6046 49 17.5V15C49 13.8954 48.1046 13 47 13H45C43.8954 13 43 12.1046 43 11Z"
        fill="#1B1B1B"
      />
      <path
        d="M60 38.6667V34.9744C60 33.8698 60.8954 32.9744 62 32.9744H65.5789C66.6835 32.9744 67.5789 32.0789 67.5789 30.9744V26C67.5789 24.8954 68.4744 24 69.5789 24H73.7895C74.894 24 75.7895 24.8954 75.7895 26V30.9744C75.7895 32.0789 76.6849 32.9744 77.7895 32.9744H82C83.1046 32.9744 84 33.8698 84 34.9744V38.6667C84 39.7712 83.1046 40.6667 82 40.6667H77.1579C76.0533 40.6667 75.1579 41.5621 75.1579 42.6667V47C75.1579 48.1046 74.2625 49 73.1579 49H69.5789C68.4744 49 67.5789 48.1046 67.5789 47V42.6667C67.5789 41.5621 66.6835 40.6667 65.5789 40.6667H62C60.8954 40.6667 60 39.7712 60 38.6667Z"
        fill="#1B1B1B"
      />
    </svg>
  );

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
