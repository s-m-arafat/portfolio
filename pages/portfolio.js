import Head from "next/head";
import React from "react";

import About from "../components/portfolio/About";
import Education from "../components/portfolio/Education";

export default function portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio | Shakil Mahmud Arafat</title>
      </Head>
      <About />
      <Education />
    </>
  );
}
