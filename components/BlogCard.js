import Card from "./Card";

export default function BlogCard() {
  return (
    <div>
      <Card title="{...Write-ups}" btn={{ val: "see more" }}>
        <div className="w-fit border-2 p-10 my-5 m-auto ring-white">
          Coming soon . . . Till then read my articles on{" "}
          <a
            href="https://roar.media/profile/arafat/articles/"
            className="green underline target:new"
            target="_blank"
            rel="noreferrer"
          >
            Roar Bangla
          </a>
        </div>
      </Card>
    </div>
  );
}
