import Badge from "../Badge";
import Card from "../Card";
import cf from "../../assets/cf.svg";
import writer from "../../assets/writer.svg";
import dev from "../../assets/dev.svg";
import Link from "next/link";

export default function IntroCard() {
  return (
    <div className="">
      <Card title="{...arafat}">
        <p className="text-center white px-0 py-2 font-fira text-sm leading-tight tracking-tighter">
          <span className="green font-extrabold text-xl">&gt;</span> A problem
          solver more than a developer
          <span className="green animate-blink font-extrabold">&#9602;</span>
        </p>

        <div className="flex flex-col flex-wrap mt-3 text-blue-200 space-y-3">
          <Badge icon={cf}>Competitive Programmer</Badge>
          <Badge icon={dev}>Full-stack Developer</Badge>
          <Badge icon={writer}>Feature Writer</Badge>
        </div>
      </Card>
      
    </div>
  );
}
