import Image from "next/image";
import logo from "../assets/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { VscFilePdf } from "react-icons/vsc";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../lib/const";
import { useRouter } from "next/router";

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const [cls, setCls] = useState("-left-3/4");
  const [overlay, setOverlay] = useState("hidden");
  const router = useRouter();
  const handleClick = () => {
    if (!toggle) {
      setToggle(true);
      setCls("left-0");
      setOverlay(" ");
    } else {
      setToggle(false);
      setCls("-left-3/4");
      setOverlay("hidden");
    }
  };

  return (
    <nav className="">
      {/* side nav mobile starts */}
      <nav
        className={`z-30 ${cls} fixed h-screen w-3/4 top-0 bg-slate-800/20 backdrop-blur-lg ease-in duration-200`}
      >
        {/* nav menu */}
        <div className="w-fit my-[25%] m-auto space-y-2" onClick={handleClick}>
          {navLinks.map((nav) => (
            <Link href={`${nav.path}`} key={nav.text}>
              <a
                className={`block text-2xl font-semibold text-slate-300 bg-slate-800/40 rounded-lg py-2 px-3 ${
                  router.pathname === nav.path ? "text-green-400" : ""
                }`}
              >
                {nav.text}
              </a>
            </Link>
          ))}
        </div>
      </nav>

      {/* Header*/}
      <header className="w-full h-20 flex justify-between p-5">
        {/* Logo at start */}
        <div className="md:ml-3 lg:ml-6">
          <Link href="/" passHref>
            <a>
              <Image src={logo} alt="logo" className="cursor-pointer" />
            </a>
          </Link>
        </div>

        {/* desktop nav */}
        <nav className="text-slate-300 hidden md:flex">
          {navLinks.map((nav) => (
            <Link href={`${nav.path}`} key={nav.text}>
              <a
                className={`px-2 h-fit font-bold tracking-wider leading-loose ${
                  router.pathname === nav.path ? "text-green-400" : ""
                }`}
              >
                {nav.text}
              </a>
            </Link>
          ))}
        </nav>

        {/* menu bar hidden at large screen */}
        <div className="flex space-x-6">
          <button className="px-2 black rounded-md font-extrabold block bg-orange h-8 active:scale-90 ease-in-out duration-100 text-center">
            <a href="/Resume.pdf">
              Resume
              <IconContext.Provider
                value={{ className: "inline ml-2", size: "1em" }}
              >
                <VscFilePdf />
              </IconContext.Provider>
            </a>
          </button>
          <div className="h-8 z-10" onClick={handleClick}>
            <IconContext.Provider value={{ className: "green", size: "2em" }}>
              <AiOutlineMenu className="md:hidden active:scale-90 ease-in-out duration-100 cursor-pointer" />
            </IconContext.Provider>
          </div>
        </div>
      </header>
      {/* overlay */}
      <div
        className={`${overlay} top-0 h-screen w-full z-20 fixed bg-black/10 backdrop-blur-sm`}
        onClick={handleClick}
      ></div>
    </nav>
  );
}
