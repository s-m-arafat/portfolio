"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { navItems } from "../lib/data";

export default function Nav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <nav className="w-fit py-2 px-4 rounded-full dark:bg-nav bg-light-primary dark:ring-green-1 dark:drop-shadow-customDark ring-1 ring-green-1/10 drop-shadow-customLight">
      <ul className="flex justify-center items-center max-w-fit">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} passHref>
              <span
                className={`mx-2 relative text-slate-800 dark:text-white-1 py-[10px] dark:font-light ${
                  item.href.toLowerCase() !== currentPath
                    ? "hover:text-green-500 dark:hover:text-green-400"
                    : ""
                }`}
              >
                {item.name}
                <span
                  className={`w-full mx-0 absolute inset-x-0 -bottom-px h-[1.5px] dark:h-[1px] ${
                    item.href.toLowerCase() === currentPath
                      ? "bg-gradient-to-r dark:from-teal-400/0 dark:via-green-400 dark:to-teal-400/0 from-teal-500/0 via-green-400 to-teal-500/0"
                      : ""
                  }`}
                ></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}