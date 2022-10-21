import Link from "next/link";

export default function Card(props) {
  return (
    <div className="text-white bg-card p-2 w-11/12 m-auto rounded-xl">
      <h1 className="text-2xl green text-center font-fira leading-tight tracking-tighter">{props.title}</h1>
      {props.children}
      {props.btn?.val ? (
        <Link href={`${props.btn.path ? props.btn.path : "#"}`}>
          <button className="block card-btn ring-1 ring-cyan-400 tracking-wide m-auto p-2 my-3 rounded-2xl font-bold active:bg-orange active:black active:scale-95 ease-in-out duration-100">
            {props.btn.val}
          </button>
        </Link>
      ) : null}
    </div>
  );
}
