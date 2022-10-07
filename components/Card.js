export default function Card(props) {
  return (
    <div className="text-white bg-card p-2 w-11/12 m-auto rounded-xl md:w-96">
      <h1 className="text-2xl green text-center font-fira">{props.title}</h1>
      {props.children}
      {props.btn?.val ? (
        <button className="block bg-orange black-text m-auto p-2 my-3 rounded-2xl font-bold active:scale-95 ease-in-out duration-100">
          <a href={`${props.btn.path ? props.btn.path : "#"}`}>
            {props.btn.val}
          </a>
        </button>
      ) : null}
    </div>
  );
}
