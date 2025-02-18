import React from "react";

export default function Badge({ children }) {
  return (
    <div className="bg-teal-950 hover:bg-teal-900 text-white px-3 py-1 rounded-3xl">
      {children}
    </div>
  );
}
