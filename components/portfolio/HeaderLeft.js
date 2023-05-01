import React from "react";
import { sociallinks } from "../../lib/const";
import SocialButton from "../utils/SocialButton";
import { IconContext } from "react-icons/lib";
import { VscFilePdf } from "react-icons/vsc";

const introText =
  "Hi, I am a Competitive programmer and FullStack Developer with a passion for Machine Learning";

export default function HeaderLeft() {
  return (
    <div className="bg-dark flex flex-col lg:flex-row lg:justify-between text-white p-5">
      <div className="flex flex-col space-y-6 lg:space-y-10">
        <div className="text-yellow m-auto p-5 font-medium font-rubik lg:pt-20">
          <div className="text-3xl font-light tracking-widest lg:text-5xl lg:tracking-wide text-center">
            Shakil Mahmud
          </div>
          <div className="text-7xl lg:text-8xl ">ARAFAT</div>
        </div>
        <div className="border-l-2 border-green-400 ml-4 p-2 bg-green-500/1000 font-play tracking-wider lg:text-xl lg:w-[80%] lg:m-auto">
          {introText}
        </div>
        <div className="pb-4">
          <button className="mx-auto w-fit px-12 text-black rounded-md font-extrabold block bg-yellow h-8 active:scale-90 ease-in-out duration-100 text-center">
            <a href="/Resume.pdf">
              View Resume
              <IconContext.Provider
                value={{ className: "inline ml-2", size: "1em" }}
              >
                <VscFilePdf />
              </IconContext.Provider>
            </a>
          </button>
        </div>
      </div>
      <div className="flex flex-row  lg:flex-col lg:space-x-0 lg:space-y-8 m-auto space-x-2 lg:py-10 text-blue-400 min-w-fit">
        {sociallinks.map((link, index) => (
          <SocialButton key={index} href={link.link} icon={link.icon}>
            {link.text}
          </SocialButton>
        ))}
      </div>
    </div>
  );
}
