import { Literata, Noto_Serif_Bengali } from "next/font/google";
import "./storybook.css";

const book = Literata({ subsets: ["latin"], variable: "--font-book" });
const bengali = Noto_Serif_Bengali({ subsets: ["bengali"], variable: "--font-bengali" });

export default function StorybookLayout({ children }) {
  return <div className={`storybook flow-root ${book.variable} ${bengali.variable}`}>{children}</div>;
}
