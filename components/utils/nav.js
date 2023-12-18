// Navigation component

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Navigation items array of objects.
// may be will update with backend data, in a later integration.
import { navItems } from "../../lib/data";

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
    // rounded wrapper
    <nav className=" w-fit py-2 px-4 rounded-full dark:bg-nav bg-light-primary dark:ring-green-1 dark:drop-shadow-customDark ring-1 ring-green-1/10 drop-shadow-customLight">
      <ul className="flex justify-center items-center  max-w-fit">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} passHref>
              <span
                className={`mx-2 relative text-slate-800 dark:text-white-1 py-[10px] dark:font-light ${
                  item.href.toLowerCase() != currentPath
                    ? "hover:text-green-500 dark:hover:text-green-400"
                    : ""
                }`}
              >
                {item.name}
                {/* Link active indicator border bottom */}
                <span
                  // h-[] is controlling the thickness of the bottom line, made it thicker in light mode to be visible clearly
                  // inset is for x axis positioning
                  //
                  className={`w-full mx-0 absolute inset-x-0 -bottom-px h-[1.5px] dark:h-[1px] ${
                    // mark the active link.
                    item.href.toLowerCase() === currentPath
                      ? "bg-gradient-to-r dark:from-teal-400/0  dark:via-green-400 dark:to-teal-400/0 from-teal-500/0 via-green-400 to-teal-500/0"
                      : ""
                  } `}
                ></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
