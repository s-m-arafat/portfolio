import React from "react";
import { EducationalQualifications } from "../../lib/const";
import { FaGraduationCap } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

export default function Education() {
  return (
    <section className="white tracking-wider bg-black/40">
      <h1 className="flex flex-row space-x-2 text-3xl lg:text-5xl justify-center p-8 text-green-400 font-bold tracking-wider ">
        <IconContext.Provider
          value={{ className: "text-green-400", size: "1em" }}
        >
          <FaGraduationCap />
        </IconContext.Provider>
        <span>Education</span>
      </h1>

      <section className="flex flex-col h-fit md:flex-row justify-between text-center">
        {EducationalQualifications.map((ed, index) => (
          <div
            key={ed.type}
            className={`w-full lg:w-1/3 p-5 ${
              index % 2 === 0 ? "bg-slate-700/20" : "bg-slate-800/20"
            }`}
          >
            <div className="text-3xl ">{ed.type}</div>
            <div>
              {ed.passingYear}, {ed.subject}
            </div>
            <div>{ed.institute}</div>
          </div>
        ))}
      </section>
    </section>
  );
}
