import React from "react";
import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import notion from "../api/notion";

export const getStaticProps = async () => {
  const pageId = "c1fe1b8ea8d44cb0bb860cdf05188f07";
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

export default function Posts({ recordMap }) {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await fetch("/api/notion");
  //       // const result = await response.json();
  //       // console.log(result);
  //       // setContent(result);

  //       const notion = new NotionAPI({
  //         activeUser: process.env.USER_ID,
  //         authToken: process.env.NOTION_TOKEN,
  //       });

  //       const recordMap = await notion.getPage(
  //         "c1fe1b8ea8d44cb0bb860cdf05188f07"
  //       );
  //       setContent(recordMap);
  //       console.log(recordMap);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>My Notion-powered Website</h1>
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={true} />
    </div>
  );
}
