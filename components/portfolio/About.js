// pages/about.js
import Image from "next/image";
import Badge from "../Badge";
import profile from "./profile.jpg";
import { sociallinks } from "../../lib/const";
import { FaQuoteLeft } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useEffect, useState } from "react";

const About = () => {
  const introText = `  Hi, I am a Competitive programmer and FullStack Developer with a passion for Writing.`;

  const [text, setText] = useState(" ");

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      if (index + 1 < introText.length) {
        setText((prev) => prev + introText[index]);
        index++;
      } else {
        clearInterval(typing);
      }
    }, 35);

    return () => {
      setText("");
      clearInterval(typing);
    };
  }, [introText]);

  return (
    <section
      className={`flex flex-col lg:flex-row bg-portfolio-hero-sm lg:bg-portfolio-hero-lg bg-cover bg-center md:bg-center bg-origin-border bg-blend-overlay bg-slate-900/30`}
    >
      {/* left intro */}
      <section className="lg:flex pt-5 pb-5 lg:w-1/2 bg-black bg-opacity-80">
        <div className="lg:w-[80%]">
          <div className="rounded-full ring-2 ring-green-500 ring-offset-4 ring-offset-green-800 h-48 w-48 m-auto">
            <Image
              src={profile}
              alt="Profile"
              className="rounded-full h-48 w-48"
              width={192}
              height={192}
              layout="fixed"
              priority
            />
          </div>

          <div className="mt-5 text-center">
            <div className="text-3xl font-bold text-amber-400">
              Shakil Mahmud Arafat
            </div>
            <p className=" text-lg h-24 md:h-20 lg:h-16  lg:text-xl font-medium my-4 mx-3 text-slate-300 text-left tracking-wider border-l-4 border-green-500 p-2 lg:w-10/12 lg:ml-10">
              {text}
              <span className="text-slate-400 animate-blink"> █</span>
            </p>
          </div>
        </div>

        <div className="flex justify-around mt-5 lg:flex-col lg:items-start lg:px-5">
          {sociallinks.map((eachLink) => (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${eachLink.link}`}
              key={eachLink.text}
              className="flex items-center justify-center rounded-full hover:shadow-md hover:bg-green-900/20 transition-shadow duration-300 tracking-wider"
            >
              <Badge
                icon={eachLink.icon}
                bg="bg-green-800/20"
                hideText={eachLink.hideText}
              >
                {eachLink.text}
              </Badge>
            </a>
          ))}
        </div>
      </section>

      {/* right intro */}
      <section className="lg:w-1/2 p-4  flex items-center justify-center bg-black bg-opacity-[.80]">
        <p className="px-1 h-fit lg:px-5 white leading-2 lg:leading-10 tracking-wider font-thin text-lg lg:text-lg ">
          <IconContext.Provider value={{ className: "green", size: "2em" }}>
            <FaQuoteLeft />
          </IconContext.Provider>
          <span className="">
            As a competitive programmer and full-stack web developer, I have a
            strong background in computer science and a passion for
            problem-solving. I have experience in various programming languages,
            including C++ and JavaScript, and have developed a range of web
            applications using modern frameworks and technologies like React.JS,
            Next.JS, ExpressJS. I excel in fast-paced, high-pressure
            environments and am always looking for new challenges to tackle.
          </span>
        </p>
      </section>
    </section>
  );
};

export default About;
