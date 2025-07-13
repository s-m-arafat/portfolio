"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "../lib/data";
import { Menu } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const handleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div onClick={handleClick}>
      <div
        className={`${
          toggle ? "" : "hidden"
        } z-50 top-0 left-0 h-screen w-full fixed bg-white/30 dark:bg-neutral-950/80 backdrop-blur-lg transition-all duration-200`}
      ></div>
      <div
        className={`${
          toggle ? "left-0" : "-left-[70%]"
        } fixed h-screen w-[70%] z-50 top-0 bg-white/90 dark:bg-neutral-950/95 p-4 shadow-lg border-r border-cyan-800/20 transition-all duration-200`}
      >
        <ul className="flex flex-col justify-center items-center gap-4 h-1/2 text-lg">
          {navItems.map((item, index) => {
            const isActive = item.href.toLowerCase() === currentPath;
            return (
              <li key={index}>
                <Link href={item.href} passHref>
                  <span
                    className={`px-5 py-2 rounded-3xl font-medium transition-colors duration-200 relative block text-center w-full
                      ${isActive
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm"
                        : "text-cyan-700 dark:text-cyan-200 hover:text-green-base hover:bg-cyan-400/10 dark:hover:text-green-300 dark:hover:bg-cyan-900/20 border border-transparent"}
                    `}
                  >
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="lg:hidden hover:cursor-pointer active:scale-90">
        <Menu size={30} className="text-teal-400 text-center mt-2"/>
      </button>
    </div>
  );
}
