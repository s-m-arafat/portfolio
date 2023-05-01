import Image from "next/image";
import React from "react";
import profile from "../../assets/profile1.png";

export default function HeaderRight() {
  return (
    //  the following text 0(font-size: 0) is the solution for the extra padding at the bottom of
    //  the image component default behavior
    //  ref: https://dev.to/christiankaindl/the-strange-img-gap-in-html

    <div className="bg-yellow relative text-[0]">
      <Image
        src={profile}
        alt="Profile Image"
        objectFit="fill"
        // layout="fixed"
        // objectPosition="50% right"
        // height={300}
        priority
        placeholder="blur"
      ></Image>
    </div>
  );
}
