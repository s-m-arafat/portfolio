import Head from "next/head";
import IntroCard from "../components/IntroCard";
import Nav from "../components/Nav";
import BlogCard from "../components/BlogCard";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  // console.log(allPostsData);
  return {
    props: {
      allPostsData,
    },
  };
}
export default function Home({ allPostsData }) {
  return (
    <div className="scroll-smooth">
      <Head>
        <title>Home | Wizarding world of Arafat</title>
        <meta
          name="description"
          content="Shakil Mahmud Arafat - Full-stack Developer &amp; Competitive Programmer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col space-y-3 lg:flex-row">
        <IntroCard />
        <div>
          <BlogCard allPostsData={allPostsData} />
        </div>
      </div>
    </div>
  );
}
