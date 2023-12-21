import React, { useState, useRef, useEffect } from "react";
import { MenuBtn } from "../../lib/svg";
import { navItems } from "../../lib/data";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MobileNav() {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    // get the current link path
    const path = router.pathname;
    setCurrentPath(path);
  }, [router.pathname]);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <div onClick={handleClick}>
      {/* overlay */}
      <div
        className={`${
          toggle ? "" : "hidden"
        } z-10 top-0 left-0 h-screen w-full fixed bg-black-1/30 backdrop-blur-lg`}
      ></div>
      <div
        className={`${
          toggle ? "left-0" : "-left-[70%]"
        } fixed h-screen w-[70%] z-10 top-0 bg-white-2 dark:bg-black-3 p-2 shadow-lg ease-in duration-200`}
      >
        <ul className="flex flex-col justify-center items-center space-y-5 h-1/2 text-2xl">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} passHref>
                <span
                  className={` ${
                    item.href.toLowerCase() != currentPath
                      ? ""
                      : "font-bold border-b border-green-500"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button className={`lg:hidden hover:cursor-pointer active:scale-90`}>
        {MenuBtn}
      </button>
    </div>
  );
}
