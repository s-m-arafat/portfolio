import React from "react";
import Nav from "./nav";
import ThemeSwitcher from "./themeSwitcher";
import Image from "next/image";
import Link from "next/link";

export default function header() {
  return (
    <div className="w-full py-3 flex justify-between px-2 lg:px-0 lg:justify-around border-b border-b-light-black-1/10 dark:border-b-dark-1/10">
      <Link href="/">
        <Image
          alt="arafat logo"
          width={121}
          height={53}
          src={"/images/logo.png"}
          className=" mix-blend-difference"
        />
      </Link>
      <div className=" hidden md:block">
        <Nav />
      </div>
      <div className=" bg-back text-end flex space-x-5 justify-center items-center">
        <ThemeSwitcher />
        <button className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="24"
            viewBox="0 0 48 36"
            fill="none"
          >
            <line
              y1="2.5"
              x2="48"
              y2="2.5"
              className=" stroke-dark-primary dark:stroke-dark-1"
              strokeWidth="4"
            />
            <line
              y1="17.5"
              x2="35"
              y2="17.5"
              className=" stroke-dark-primary dark:stroke-dark-1"
              strokeWidth="4"
            />
            <line
              y1="33.5"
              x2="22"
              y2="33.5"
              className=" stroke-dark-primary dark:stroke-dark-1"
              strokeWidth="4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
