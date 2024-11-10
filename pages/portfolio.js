import React from "react";
import Head from "next/head";


Portfolio.title = "Portfolio";
export default function Portfolio() {
  return (
    <div className="flex flex-col ">
      <Head>
        <title>Portfolio | Shakil Mahmud Arafat</title>
        <meta
          name="description"
          content="Hi my name is Shakil Mahmud Arafat. Undergrad EEE student with an interest in Machine Learning, Programming and VLSI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
