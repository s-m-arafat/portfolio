// Navigation component

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Navigation items array of objects.
// Should be updated with backend data, in a later integration.

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Posts",
    href: "/posts",
  },

  {
    name: "Activities",
    href: "/activities",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

// Main Navigation component
export default function Nav() {
  // initialize the router and the state
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // get the current link path
    const path = router.pathname;
    setCurrentPath(path);
  }, [router.pathname]);

  return (
    <nav className="w-fit p-2 rounded-full dark:bg-dark-secondary bg-light-primary dark:ring-dark-green-1 dark:drop-shadow-customDark ring-1 ring-dark-green-1/10 drop-shadow-customLight">
      <ul className="flex justify-center items-center">
        {navItems.map((item, index) => (
          <li
            key={index}
            className={`py-2 md:py-0 ${
              item.href.toLowerCase() != currentPath
                ? "hover:scale-[1.08] transition duration-200 ease-out hover:ease-in"
                : ""
            }`}
          >
            <Link href={item.href}>
              <a className="relative dark:text-dark-1 text-slate-800 px-3 md:px-3 py-[10px] md:py-3 dark:font-light md:text-base">
                {item.name}
                {/* Link active indicator border bottom */}
                <span
                  className={`md:w-[90%] md:mx-0 absolute inset-x-1 -bottom-px md:h-[2px] md:dark:h-[1.5px] ${
                    item.href.toLowerCase() === currentPath
                      ? "bg-gradient-to-r dark:from-teal-400/0  dark:via-green-400 dark:to-teal-400/0 from-teal-500/0 via-green-400 to-teal-500/0"
                      : ""
                  } `}
                ></span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
