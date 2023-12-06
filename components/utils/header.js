import React from "react";
import Nav from "./nav";
import ThemeSwitcher from "./themeSwitcher";
import Image from "next/image";
import Link from "next/link";
import { MenuBtn } from "../../lib/svg";

export default function header() {
  return (
    <div className="w-full py flex justify-between px-2 lg:px-0 lg:justify-around border-b border-b-light-black-1/10 dark:border-b-dark-1/10">
      {/* Logo */}
      {/*flex to center the logo*/}
      <div className="w-1/4 flex justify-center items-center">
        <Link href="/" passHref>
          {/* flex added to remove the bottom padding from the img */}
          <span className="flex py-1">
            <Image
              alt="arafat logo"
              width={50}
              height={50}
              src={"/images/logo.png"}
            />
          </span>
        </Link>
      </div>
      {/* Navigation */}
      <div className="w-1/2 hidden lg:flex lg:items-center lg:justify-center ">
        {/* center the following component */}
        <Nav />
      </div>
      {/* Theme Switcher and ham menu*/}
      <div className="w-1/4 bg-whit text-end flex space-x-5 justify-center items-center">
        <ThemeSwitcher />
        <button className="lg:hidden">{MenuBtn}</button>
      </div>
    </div>
  );
}
