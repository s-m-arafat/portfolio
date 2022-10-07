import Head from "next/head";
import IntroCard from "../components/IntroCard";
import Nav from "../components/Nav";
import BlogCard from "../components/BlogCard";

export default function Home() {
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
      <Nav />
      <div className="flex flex-col space-y-3 ">
        <IntroCard />
        <div>
          <BlogCard />
        </div>
      </div>
    </div>
  );
}
