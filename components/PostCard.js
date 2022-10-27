import Link from "next/link";
import React from "react";
import Badge from "./Badge";
import Date from "./Date";

export default function PostCard({ postData }) {
  const { id, date, title, desc, tags } = postData;
  return (
    <li>
      <div className="bg-black/20 rounded-2xl m-auto p-3">
        <div className="pt-3 pb-1">
          <Link href={`posts/${id}`}>
            <a className="orange text-xl font-semibold">{title}</a>
          </Link>
        </div>

        <div className="-mt-2 mb-3 ml-1 text-slate-400 text-sm">
          <Date dateString={date} />
        </div>

        <p className="p-1 white font-light text-sm">{desc}</p>

        <div className="flex space-x-1 flex-wrap font-semibold green text-xs tracking-tight font-fira">
          <span className="my-auto">tags: </span>

          {tags.map((tag) => (
            <Badge text={tag} key={tag} />
          ))}
        </div>
      </div>
    </li>
  );
}
