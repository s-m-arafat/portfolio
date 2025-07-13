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
    <nav className="w-fit py-2 px-6 rounded-full bg-white/5 dark:bg-neutral-950 border border-cyan-800/20 backdrop-blur-sm">
      <ul className="flex justify-center items-center gap-2 max-w-fit">
        {navItems.map((item, index) => {
          const isActive = item.href.toLowerCase() === currentPath;
          return (
            <li key={index}>
              <Link href={item.href} passHref>
                <span
                  className={`px-4 py-2 rounded-3xl font-medium transition-colors duration-200 relative
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
    </nav>
  );
}