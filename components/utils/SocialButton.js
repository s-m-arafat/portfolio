import React from "react";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
export default function SocialButton({ children, href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex bg-[#2d2d2d] underline underline-offset-2 rounded-full px-2 tracking-wide items-center py-1"
    >
      <div className="py-1 leading-loose text-[0] rounded-full flex md:pr-1">
        <Image src={icon} alt="icon" height={20} width={20} />
      </div>
      <div className="">
        <span className="hidden md:inline">{children}</span> {<IconExternalLink className="hidden md:inline" size={"0.8rem"} />}
      </div>
    </a>
  );
}
