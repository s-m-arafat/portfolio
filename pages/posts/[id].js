import Head from "next/head";
//import Layout from "../../components/layout";
import { getAllPostIDs, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import Badge from "../../components/Badge";
import Link from "next/link";


export async function getStaticPaths() {
  const paths = getAllPostIDs();
  //console.log(paths)
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //console.log(params);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* <Layout> */}
      <div className="white">
        <Link href="/posts">{"< back to Posts"}</Link>
      </div>
      <div className="p-5 mx-auto text-center">
        <div className="orange text-2xl">{postData.title}</div>

        <div className="text-slate-200 font-semiobold">
          <Date dateString={postData.date} />
        </div>
        <div className="text-slate-200 ring-1 w-fit m-auto py-1 px-2 rounded-full mb-2 mt-2">{postData.author}</div>
        <div className="flex space-x-1 flex-wrap font-semibold green text-xs tracking-tight font-fira">
          <span className="my-auto">tags: </span>
          {postData.tags.map((tag) => (
            <Badge text={tag} key={tag} />
          ))}
        </div>

        <div
          className="mt-8 prose prose-p:white prose-li:white prose-strong:white prose-p: font-light text-left m-auto"
          dangerouslySetInnerHTML={{ __html: postData.htmlContent }}
        />
      </div>
      {/* </Layout> */}
    </>
  );
}
