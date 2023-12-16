import React from "react";
import Hero from "../components/portfolio/hero";
import Card from "../components/utils/card";
import Head from "next/head";
import { Experience, Education } from "../lib/data";

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
      <Hero />

      <div className="">
        <Card
          Timeline
          content={Experience.content}
          name={Experience.name}
          img={Experience.img}
          imgPlace="right"
        />
        <Card
          Timeline
          content={Education.content}
          name={Education.name}
          img={Education.img}
          imgPlace="left"
        />
      </div>
    </div>
  );
}
