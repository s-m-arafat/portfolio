import Image from "next/image";
import logo from "../assets/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { VscFilePdf } from "react-icons/vsc";

export default function Nav() {
  return (
    <div className="w-full h-28 flex justify-between p-5 lg:pl-40">
      {/* Logo at start */}
      <div className="w-1/2 md:w-2/3">
        <Image src={logo} alt="logo" />
      </div>
      {/* menu bar hidden at large screen */}
      <div className="flex w-1/2 md:w-1/3 justify-between ">
        <button className="px-2 black rounded-md font-extrabold block bg-orange h-8 active:scale-90 ease-in-out duration-100">
          <a href="/CV.pdf">
            Resume
            <IconContext.Provider
              value={{ className: "inline ml-2", size: "1em" }}
            >
              <VscFilePdf />
            </IconContext.Provider>
          </a>
        </button>
        <IconContext.Provider value={{ className: "green", size: "2em" }}>
          <AiOutlineMenu className="md:hidden active:scale-90 ease-in-out duration-100" />
        </IconContext.Provider>
      </div>
    </div>
  );
}
