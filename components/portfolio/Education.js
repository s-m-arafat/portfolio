import React from "react";
import { EducationalQualifications } from "../../lib/const";
export default function Education() {
  return (
    <section className="p-4 white tracking-wider bg-black/50">
      <h1 className="text-2xl">Education</h1>
      <section className="flex flex-col h-fit space-y-8 md:flex-row md:space-y-0 justify-around text-center">
        {EducationalQualifications.map((ed) => (
          <div key={ed.type}>
            <div className="text-3xl">{ed.type}</div>
            <div>{ed.passingYear}, {" "}{ed.subject}</div>
            <div>{ed.institute}</div>
          </div>
        ))}
      </section>
    </section>
  );
}
