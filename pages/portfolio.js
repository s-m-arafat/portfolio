import React from "react";
import Image from "next/image";

const socials = [
  {
    name: "facebook",
    link: "https://www.facebook.com/arft666",
    icon: "/icons/facebook.png",
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/in/shakil-mahmud-arafat/",
    icon: "/icons/linkedin.png",
  },
  {
    name: "github",
    link: "https://github.com/s-m-arafat",
    icon: "/icons/github.png",
  },
  {
    name: "mail",
    link: "mailto:shakilmahmudarafat@gmail.com",
    icon: "/icons/mail.png",
  }]


export default function Portfolio() {
  return (
    <div className="">
      {/* introductory part starts */}
      {/* container */}
      <div className="w-full flex flex-col lg:flex-row items-center mt-4">
        <div className="w-1/2 bg-whte flex justify-center">
          <Image
            src="/images/profile.jpeg"
            height={300}
            width={300}
            alt="profile image of arafat"
            className="rounded-full object-none object-center  "
          />
        </div>
        <div className="w-full lg:w-1/2 bg-blck mt-4 dark:text-dark-1">
          <h1 className="text-4xl md:text-6xl font-bold pl-8 md:pl-6 lg:pl-0">
            SHAKIL MAHMUD <br />
            ARAFAT
          </h1>
          <p className=" text-base mt-4 w-full lg:w-2/3 px-6 lg:px-0 dark:text-dark-3">
            Undergrad EEE student with an interest in Machine Learning,
            Programming and VLSI
          </p>
          <div className="flex mt-4 lg:mt-8 justify-center lg:justify-start">
            {socials.map((social) => (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
                className="mr-4"
              >
                <Image
                  src={social.icon}
                  height={30}
                  width={30}
                  alt={social.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* divider line */}
      <span className="w-2/3 md:w-1/2 block mt-2 lg:mt-[2.5rem] mx-auto inset-x-1 -bottom-px h-[1px] dark:h-[0.5px] bg-gradient-to-r from-teal-500/0 via-green-400 to-teal"></span>
      {/* introductory part ends */}
    </div>
  );
}
