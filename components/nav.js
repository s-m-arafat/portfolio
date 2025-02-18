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
    <nav className="w-fit py-2 px-4 rounded-full dark:bg-neutral-950 bg-teal-200/10 dark:ring-green-base ring-1 ring-green-light drop-shadow-lg">
      <ul className="flex justify-center items-center max-w-fit">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} passHref>
              <span
                className={`mx-2 relative text-teal-900 dark:text-teal-100 py-[10px] dark:font-light ${
                  item.href.toLowerCase() !== currentPath
                    ? "hover:text-cyan-500 dark:hover:text-cyan-500 "
                    : ""
                }`}
              >
                {item.name}
                <span
                  className={`w-full mx-0 absolute inset-x-0 -bottom-px h-[1.5px] dark:h-[1px] ${
                    item.href.toLowerCase() === currentPath
                      ? "bg-gradient-to-r dark:from-green-300/0 dark:via-green-300 dark:to-green-300/0 from-green-400/0 via-green-400 to-green-400/0"
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