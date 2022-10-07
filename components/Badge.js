import Image from "next/image";

export default function Badge(props) {
  return (
    <div className="flex flex-row bg-badge m-1 w-fit p-2 rounded-lg white">
      <span className="inline m-auto pr-2">
        {props.ico ? (
          <Image src={props.ico} alt="icon" width={24} height={24} />
        ) : null}
      </span>
      <span className="inline text-sm m-auto">{props.text}</span>
    </div>
  );
}
