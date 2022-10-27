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
          hidden: true,
          path:"/portfolio"
        }}
      >
        <p className="text-center white px-0 py-2 font-fira text-sm leading-tight tracking-tighter">
          <span className="green font-extrabold text-xl">&gt;</span> A problem solver more than a
          developer
          <span className="green animate-blink font-extrabold">&#9602;</span>
        </p>

        <div className="flex flex-wrap mt-3 md:justify-center green">
          <Badge text="Competitive Programmer" ico={cf} />
          <Badge text="Full-stack Developer" ico={dev} />
          <Badge text=" Feature Writer" ico={writer} />
        </div>
      </Card>
    </div>
  );
}
