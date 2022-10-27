import Image from "next/image";
import logo from "../assets/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { VscFilePdf } from "react-icons/vsc";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "../lib/const";

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const [cls, setCls] = useState("-left-3/4");
  const [overlay, setOverlay] = useState("hidden");
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
    <>
      {/* side nav mobile starts */}
      <div
        className={`z-30 ${cls} fixed h-screen w-3/4 top-0 bg-slate-200/20 backdrop-blur-md ease-in duration-200`}
      >
        {/* nav menu */}
        <div className="w-fit my-[25%] m-auto space-y-3" onClick={handleClick}>
          {navLinks.map((nav) => (
            <Link href={`${nav.path}`} key={nav.text}>
              <a className="block text-2xl font-semibold white hover:bg-black/30 hover:rounded-md py-2 px-3">{nav.text}</a>
            </Link>
          ))}
        </div>
      </div>
      {/* side nav mobile ends */}
      <div className="w-full h-20 flex justify-between p-5 lg:pl-40">
        {/* Logo at start */}
        <div className="w-1/2 md:w-2/3">
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        {/* menu bar hidden at large screen */}
        <div className="flex w-1/2 md:w-1/3 justify-between ">
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
              <AiOutlineMenu className="md:hidden active:scale-90 ease-in-out duration-100" />
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <div
        className={`${overlay} top-0 h-screen w-full z-20 fixed bg-black/10 backdrop-blur-sm`}
        onClick={handleClick}
      ></div>
    </>
  );
}
