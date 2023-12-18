import React from "react";
import Image from "next/image";

import { socials } from "../../lib/data";

export default function hero() {
  return (
    <div>
      {/* introductory part starts */}
      {/* container */}
      <div className="w-full flex flex-col lg:flex-row items-center mt-4">
        <div className="w-1/2 bg-whte flex justify-center">
          <Image
            priority
            src="/images/profileimage.jpeg"
            height={300}
            width={300}
            alt="profile image of arafat"
            className="rounded-full object-none object-center"
          />
        </div>
        <div className="w-full lg:w-1/2 bg-blck mt-4 dark:text-dark-1">
          <h1 className="text-4xl md:text-6xl font-bold pl-8 md:pl-6 lg:pl-0">
            SHAKIL MAHMUD <br />
            ARAFAT
          </h1>
          <p className=" text-base mt-4 w-full lg:w-2/3 px-6 lg:px-0 dark:text-white-3">
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
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
