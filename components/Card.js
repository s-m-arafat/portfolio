import Link from "next/link";

export default function Card(props) {
  return (
    <div className="text-white bg-card w-[97%] p-1 m-auto rounded-xl">
      <h1 className="text-2xl green text-center font-fira leading-tight tracking-tighter">
        {props.title}
      </h1>
      {props.children}
      <div className={`${props.btn?.hidden === true ? "lg:hidden" : ""}`}>
        {props.btn?.val ? (
          <Link href={`${props.btn.path ? props.btn.path : "#"}`} >
            <button className="block bg-black/20 m-auto py-1 px-2 my-3 font-light text-blue-400 text-sm tracking-wide rounded-md ring-2 ring-gray-600 active:ring-1 active:scale-95 ease-in-out duration-100">
              {props.btn.val}
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
