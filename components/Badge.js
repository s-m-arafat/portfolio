import Image from "next/image";

export default function Badge({ bg, icon, children, hideText }) {
  const placeIcon = <Image src={icon} height="24" width="24" alt="icon" />;

  return (
    <div
      className={`flex ${
        bg ? bg : "bg-slate-800/60"
      } rounded-full p-2 w-fit`}
    >
      {icon ? placeIcon : null}

      <div className={`${hideText ? "hidden lg:block font-semibold white pr-2" : null} pl-2`}>{children}</div>
    </div>
  );
}
