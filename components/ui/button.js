import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
export default function Button({ children, link, hideicon }) {
  return (
    <div>
      <Link
        href={link}
        passHref
        className="bg-blue-base text-white px-4 py-2 mt-5 rounded-md"
      >
        {children}
        {!hideicon && <ChevronRightIcon size={20} className="inline mb-0.5" />}
      </Link>
    </div>
  );
}
