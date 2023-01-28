// pages/about.js
import Image from "next/image";
import Link from "next/link";
import Badge from "../Badge";
import profile from "./profile.jpg";
import { sociallinks } from "../../lib/const";

const About = () => {
  return (
    <section className="flex flex-col lg:flex-row bg-slate-800/30">
      <section className="lg:flex pt-5 pb-5 lg:w-1/2">
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
            <p className=" text-lg lg:text-xl font-medium my-4 mx-3 text-slate-300 text-left tracking-wider border-l-4 border-green-500 p-2 lg:w-10/12 lg:ml-10">
              Hi, I am a <strong>competitive programmer</strong> and{" "}
              <strong>FullStack Developer</strong> with a passion for{" "}
              <strong>Writing</strong> .
            </p>
          </div>
        </div>

        <div className="flex justify-around mt-5 lg:flex-col lg:items-start lg:px-5">
          {sociallinks.map((eachLink) => (
            <Link href={`${eachLink.link}`} key={eachLink.text}>
              <a className="flex items-center justify-center rounded-full hover:shadow-md hover:shadow-emerald-500/20 transition-shadow duration-300">
                <Badge
                  icon={eachLink.icon}
                  bg="bg-green-700/20"
                  hideText={eachLink.hideText}
                >
                  {eachLink.text}
                </Badge>
              </a>
            </Link>
          ))}
        </div>
      </section>
      <section className="lg:w-1/2 p-4 bg-black/20">
        <p className="w-full px-1 lg:px-5 white leading-2 lg:leading-10 tracking-wider font-thin text-lg lg:text-lg">
          As a competitive programmer and full-stack web developer, I have a
          strong background in computer science and a passion for
          problem-solving. I have experience in various programming languages,
          including C++ and JavaScript, and have developed a range of web
          applications using modern frameworks and technologies like React.JS,
          Next.JS, ExpressJS. I excel in fast-paced, high-pressure environments
          and am always looking for new challenges to tackle.
        </p>
      </section>
    </section>
  );
};

export default About;
