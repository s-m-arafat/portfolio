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
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-cyan-800/20 hover:border-cyan-700/30 transition-all duration-300 min-h-32 w-80 md:w-96">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-secondary-light">{icon && icon}</span>
          <h2 className="text-xl font-semibold text-title">
            {title}
          </h2>
        </div>
        <div className="w-full h-[1px] bg-cyan-800/20"></div>
        <div className="flex flex-col space-y-6">
          <p className="text-paragraph text-sm">{content}</p>
          {children}
          <div className={`${buttonText ? "block" : "hidden"} flex justify-center`}>
            <Button link={link}>{buttonText}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
