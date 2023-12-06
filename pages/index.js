import Head from "next/head";
import Link from "next/link";


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

      <main className="flex flex-col space-y-3">
        <div className="lg:hidden">
        </div>
        <div className="p-5 text-lg lg:text-2xl font-bold bg-orange-400 rounded-2xl w-fit m-auto text-center">
          <Link href="/portfolio">
            <span className="black text-center p-5">View complete portfolio</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
