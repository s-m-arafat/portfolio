import React from "react";
import Nav from "./nav";
import ThemeSwitcher from "./themeSwitcher";
import MobileNav from "./mobileNav";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="w-full flex justify-between px-2 lg:px-0 lg:justify-around border-b border-b-black-1/10 dark:border-b-white-1/10">
      {/* Logo */}
      {/*flex to center the logo*/}
      <div className="w-1/4 flex justify-center items-center">
        <Logo />
      </div>
      {/* Navigation */}
      <div className="w-1/2 hidden lg:flex lg:items-center lg:justify-center ">
        {/* center the following component */}
        <Nav />
      </div>
      {/* Theme Switcher and ham menu*/}
      <div className="w-1/4 bg-whit text-end flex space-x-5 justify-center items-center">
        <ThemeSwitcher />
        <MobileNav />
      </div>
    </div>
  );
}
