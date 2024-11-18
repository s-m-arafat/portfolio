
import "./globals.css";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

// header for entire app
import Header from "../components/header";
import Footer from "../components/footer";
import construction from "../public/images/under-construction.png";
export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-light-primary dark:bg-dark-primary text-black-1 dark:text-white-2  min-h-screen pb-24">
        <ThemeProvider  attribute="data-mode">
          <Header />
          {/* under construction place holder */}
          <Image
            className="m-auto"
            src={construction}
            height={"100%"}
            width={"100%"}
            alt="under construction site"
          />
          <div>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
