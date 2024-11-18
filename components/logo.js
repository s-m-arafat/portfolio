import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Logo() {
  return (
    <div>
      {/*flex to center the logo*/}
      <Link href="/" passHref>
          {/* flex added to remove the bottom padding from the img */}
          <span className="flex py-1">
            <Image
              alt="arafat logo"
              width={50}
              height={50}
              src={"/images/logo.svg"}
            />
            <code className="text-xs flex flex-col justify-end">&#945;lpha</code>
          </span>
        </Link>
    </div>
  );
}
