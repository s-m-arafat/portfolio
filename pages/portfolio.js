import Head from "next/head";
import React from "react";
import HeaderLeft from "../components/portfolio/HeaderLeft";
import HeaderRight from "../components/portfolio/HeaderRight";
import Education from "../components/portfolio/Education";

export default function Portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio | Shakil Mahmud Arafat</title>
      </Head>
      {/* Hero */}
      <section className="flex flex-col lg:flex-row min-h-fit bg-dark">
        <div className="w-full lg:w-[60%]">
          <HeaderLeft />
        </div>
        <div className="w-full lg:w-[40%]">
          <HeaderRight />
        </div>
      </section>
      {/* Education */}
      <Education />
    </>
  );
}
