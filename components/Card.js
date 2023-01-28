import React from "react";

export default function Card({ title, children }) {
  return (
    <div className="mt-5 bg-gray-900/50 w-[98%] m-auto">
      <h1 className="green text-3xl tracking-tightest text-center font-fira">{title}</h1>
      <section>{children}</section>
    </div>
  );
}
