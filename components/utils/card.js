import React from "react";
import Image from "next/image";

export default function card({ Timeline, content, name, img, imgPlace }) {
  return (
    // container wrapper
    <div
      className={`flex flex-col lg:flex-row ${
        imgPlace == "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      <Image
        src={img}
        height={150}
        width={150}
        alt={name}
        className="lg:h-72 lg:w-72 m-auto"
      />
      {/* main card design and content placement */}
      <div className=" bg-slate-800">
        <h1>{name}</h1>
        {Timeline
          ? content.map((value, index) => (
              <ul key={index}>
                <li>{value.title}</li>
                <li>{value.institute}</li>
                <li>
                  {value.startDate} - {value.endDate}
                </li>
                <li>{value.description}</li>
              </ul>
            ))
          : "not timeline"}
      </div>
    </div>
  );
}
