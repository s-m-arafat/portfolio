import Image from "next/image";
import logo from "../assets/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { VscFilePdf } from "react-icons/vsc";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [toggle, setToggle] = useState(false);
  const [cls, setCls] = useState("-left-2/3");
  const [overlay, setOverlay] = useState("hidden");
  const handleClick = () => {
    if (!toggle) {
      setToggle(true);
      setCls("left-0");
      setOverlay(" ");
    } else {
      setToggle(false);
      setCls("-left-2/3");
      setOverlay("hidden");
    }
  };

  return (
    <>
      <div
        className={`${cls} h-screen w-2/3 top-0 bg-white/10 fixed z-30 backdrop-blur-md ease-in duration-200`}
      >
        <Link href="/">
          <a className="text-white font-bold z-30 p-5">Home</a>
        </Link>
      </div>
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
            <a href="/CV.pdf">
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
        className={`${overlay} top-0 h-screen w-full z-20 fixed bg-black/10 backdrop-blur-sm duration-200 ease-linear`}
        onClick={handleClick}
      ></div>
    </>
  );
}
