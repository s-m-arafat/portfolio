// app root layout
// import global styles and theme provider for dark mode
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { BackgroundMusicProvider } from "@/providers/BackgroundMusicProvider";

// header and footer for entire app
import Header from "../components/header";
import Footer from "../components/footer";
import BackgroundMusicToggle from "../components/BackgroundMusicToggle";

export const metadata = {
  title: "Arafat | Home",
  description: "Arafat's personal website",
  charset: "UTF-8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="flex flex-col bg-white dark:bg-blueGray-dark text-black-1 dark:text-white-2 min-h-screen">
        <ThemeProvider attribute="data-mode" defaultTheme="system" enableSystem>
          <BackgroundMusicProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <BackgroundMusicToggle />
          </BackgroundMusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
