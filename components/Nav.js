import Image from "next/image";
import logo from "../assets/logo.svg";
import { AiOutlineMenu } from "react-icons/ai";
import { IconContext } from "react-icons/lib";

export default function Nav() {
  return (
    <div className="w-full h-28 flex justify-between p-5 lg:pl-40">
      {/* Logo at start */}
      <div>
        <Image src={logo} alt="logo" />
      </div>
      {/* menu bar hidden at large screen */}
      <IconContext.Provider value={{ className: "green", size: "2em" }}>
        <AiOutlineMenu className="md:hidden active:scale-90 ease-in-out duration-100" />
      </IconContext.Provider>
    </div>
  );
}
