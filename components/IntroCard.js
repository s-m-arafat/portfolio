import Badge from "./Badge";
import Card from "./Card";
import cf from "../assets/cf.svg";
import writer from "../assets/writer.svg";
import dev from "../assets/dev.svg";

export default function IntroCard() {
  return (
    <div className="">
      <Card
        title="{...arafat}"
        btn={{
          val: `Want to know more`,
        }}
      >
        <p className="text-center white px-2 py-2 font-fira text-xs">
          <span className="green">&gt;</span> A problem solver more than a
          developer
          <span className="green animate-blink font-extrabold">&#9602;</span>
        </p>

        <div className="flex flex-wrap mt-5 md:justify-center white">
          <Badge text="Competitive Programmer" ico={cf} />
          <Badge text="Full-stack Developer" ico={dev} />
          <Badge text=" Feature Writer" ico={writer} />
        </div>
      </Card>
    </div>
  );
}
