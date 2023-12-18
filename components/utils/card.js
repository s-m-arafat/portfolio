import React from "react";
import Image from "next/image";

export default function card({
  Timeline,
  content,
  name,
  img,
  imgPlace = "left",
}) {
  return (
    // container wrapper
    <div
      className={`relative flex flex-col items-center lg:flex-row lg:justify-around ${
        imgPlace == "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      <Image
        src={img}
        height={150}
        width={150}
        alt={name}
        className="lg:h-72 lg:w-72"
      />
      {/* main card design and content placement */}
      <div className="w-[90%] lg:w-[40%] bg-zinc-50 hover:bg-zinc-100 dark:bg-black-2 dark:hover:bg-zinc-800 p-3 rounded-xl border-0 dark:border border-black-4/50">
        <h1 className="text-3xl text-center pb-2">{name}</h1>
        <ul className="border-l border-green-600/50 pl-2">
          {Timeline
            ? content.map((value, index) => (
                <li key={index}>
                  <h3 className="text-lg font-semibold">{value?.institute}</h3>
                  <div className="space-x-5">
                    <span>{value.title}</span>
                    <span className="text-white-3">
                      {value?.startDate} - {value?.endDate}
                    </span>
                  </div>

                  <details>
                    <p>{value?.description}</p>
                  </details>
                  <div className="border-b border-zinc-600/50 w-[80%] mx-auto my-2"></div>
                </li>
              ))
            : "not timeline"}
        </ul>
        {/* <button className="bg-green-400">+ Details</button> */}
      </div>
    </div>
  );
}
