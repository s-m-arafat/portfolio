import Image from "next/image";
import React from "react";
import img from "../assets/construction.png";
export default function Construction() {
  return (
    <div className="w-full mt-5">
      <p className="text-lg text-center text-yellow-500 font-bold p-4">Sorry doing some work on this site ⚠️</p>
      <Image src={img} alt="site under construction image" sizes="1" />
    </div>
  );
}
