import Head from "next/head";
import React from "react";

import About from "../components/portfolio/About";

export default function portfolio() {
  return (
    <>
      <Head>
        <title>Portfolio | Shakil Mahmud Arafat</title>
      </Head>
      <About />
    </>
  );
}
