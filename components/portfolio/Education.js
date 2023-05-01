import React from "react";
import EdTimline from "./EdTimeline";
import Image from "next/image";
import education from "/public/education.png";
export default function Education() {
  return (
    <div className="bg-gray-900">
      <h1 className="text-yellow text-5xl font-play text-center p-5">
        Education
      </h1>
      <section className=" flex flex-col-reverse lg:flex-row lg:justify-around lg:items-center lg:px-32">
        <div className="px-2 py-8 lg:w-fit content-end">
          <EdTimline/>
        </div>
        <div className="lg:w-fit" >
          <div className="h-32 w-32 m-auto lg:h-full lg:w-full">
            <Image priority src={education} alt="Education Illustration" />
          </div>
        </div>
      </section>
    </div>
  );
}
