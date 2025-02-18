import React from "react";
import Card from "@/components/ui/card";
import { BookType, Microscope, FolderCode } from "lucide-react";

export default function Explore() {
  return (
    <div className="p-10" id="explore">
      <h1 className="text-4xl font-bold p-4 text-center">
        Explore
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center items-center">
        <Card
          icon={<BookType size={25} />}
          title="Posts"
          content="Explore my learnings, thoughts and stories"
          link="/posts"
          buttonText="Read Posts"
        />

        <Card
          icon={<Microscope size={25} />}
          title="Research"
          content="Explore my ideas and findings"
          link="/research"
          buttonText="View Research"
        />

        <Card
          icon={<FolderCode size={25} />}
          title="Projects"
          content="Explore my skills and works"
          link="/projects"
          buttonText="View Projects"
        />
      </div>
    </div>
  );
}
