import React from "react";
import Image from "next/image";
import SocialGroup from "@/components/socialgroup";
import Expertise from "@/components/expertise";
import Explore from "@/components/explore";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row">
        {/* image container */}
        <div className="relative w-full lg:w-1/2 ">
          <Image
            src="/images/chip-bg-3.jpg"
            alt="chip"
            width={500}
            height={500}
            className="relative z-10 w-full "
            priority
          />
          {/* faded overlay */}
          <div className="gradient-fade-edges"></div>
        </div>
        <div className="relative flex items-center pt-10 px-5 lg:pl-10 w-full lg:w-1/2 ">
          <div className="grid-pattern" />
          <div className="flex flex-col align-middle">
            <div className="leading-10 antialiased">
              <p className="text-md text-cyan-800">Hello! I&apos;m</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-cyan-400">
                Shakil Mahmud Arafat
              </h1>
              <p className="text-sm md:text-md text-cyan-700 font-['Fira_Code'] pt-2">
                Welcome to the realm of my ideas and thoughts.
              </p>
            </div>
            <Expertise />
            <div className="flex space-x-5 mt-5 items-center justify-center md:justify-start">
              <Button link="/#explore" hideicon>
                Explore
              </Button>
              <Button link="/portfolio">View Portfolio</Button>
            </div>
            <div className="pb-4 lg:pb-0 lg:mt-16">
              <SocialGroup />
            </div>
          </div>
        </div>
      </div>
      <Explore />
    </div>
  );
}
