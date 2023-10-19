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
      <div className="w-full flex">
        <div className="w-1/2 bg-whte flex justify-center">
          <Image
            src="/images/profile.jpeg"
            height={300}
            width={300}
            alt="profile image of arafat"
            className="rounded-full object-none object-center"
          />
        </div>
        <div className="w-1/2 bg-blak mt-4 dark:text-dark-1">
          <h1 className="text-6xl font-bold">
            SHAKIL MAHMUD <br />
            ARAFAT
          </h1>
          <p className=" text-base mt-4 w-2/3 dark:text-dark-3">
            Undergrad EEE student with an interest in Machine Learning,
            Programming and VLSI
          </p>
          <div className="flex mt-8">
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
      <span className="w-1/2 block mt-[2rem] mx-auto inset-x-1 -bottom-px h-[1px] dark:h-[0.5px] bg-gradient-to-r from-teal-500/0 via-green-400 to-teal"></span>
      {/* introductory part ends */}
    </div>
  );
}
