import Card from "./Card";
import PostCard from "./PostCard";

export default function BlogCard({ allPostsData }) {
  return (
    <div>
      <Card title="{...write-ups}" btn={{ val: "see more", path: "/posts" }}>
        <section>
          <ul className="space-y-3 mt-3">
            {allPostsData.map((postData) => (
              //console.log(postData)
              <PostCard postData={postData} key={postData.id}/>
            ))}
          </ul>
        </section>
      </Card>
    </div>
  );
}
