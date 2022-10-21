import Image from "next/image";

export default function Badge(props) {
  return (
    <div className="flex flex-row bg-slate-900 m-1 w-fit px-2 py-1 rounded-lg space-x-2">
      {props.ico ? (
        <div className="m-auto h-6 w-6">
          <Image src={props.ico} alt="icon" width={24} height={24} />
        </div>
      ) : null}

      <span className="inline m-auto">{props.text}</span>
    </div>
  );
}
