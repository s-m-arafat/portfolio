import React from "react";
import Nav from "./nav";
import ThemeSwitcher from "./themeSwitcher";
import Image from "next/image";
import Link from "next/link";
import { MenuBtn } from "../../lib/svg";

export default function header() {
  return (
    <div className="w-full py-3 flex justify-between px-2 lg:px-0 lg:justify-around border-b border-b-light-black-1/10 dark:border-b-dark-1/10">
      <div className="w-1/4">
        <Link href="/">
          <Image
            alt="arafat logo"
            width={121}
            height={53}
            src={"/images/logo.png"}
            className="mix-blend-difference"
          />
        </Link>
      </div>
      <div className="w-1/2 hidden lg:flex lg:items-center lg:justify-center ">
        {/* center the following component */}
        <Nav />
      </div>
      <div className="w-1/4 text-end flex space-x-5 justify-center items-center">
        <ThemeSwitcher />
        <button className="lg:hidden">{MenuBtn}</button>
      </div>
    </div>
  );
}
