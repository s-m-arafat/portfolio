import React from "react";
import Link from "next/link";
import Button from "./button";

export default function Card({
  children,
  title,
  content,
  link,
  buttonText,
  icon,
}) {
  const Icon = icon;
  return (
    <div className="bg-teal-200/10 dark:bg-neutral-950 shadow-lg dark:shadow-stone-950 min-h-32 w-80 md:w-96 ring-[0.2px] hover:shadow-sm ring-black dark:ring-white rounded-lg">
      <div className="pt-4 pb-1 px-4">
        <span className="text-green-light">{icon && icon}</span>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-teal-500">
          {title}
        </h2>
      </div>
      {/* divider */}
      <div className="w-full h-0.5 bg-neutral-200 dark:bg-neutral-800"></div>
      <div className="pb-6 pt-3 px-4">
        <p className="text-neutral-700 dark:text-neutral-400 mt-4">{content}</p>
        {children}
        <div
          className={`${
            buttonText ? "block " : "hidden "
          } mt-5 flex justify-center`}
        >
          <Button link={link}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
}
