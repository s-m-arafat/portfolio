import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AudioDock from "@/components/storybook/AudioDock";
import { BackgroundMusicProvider } from "@/providers/BackgroundMusicProvider";
import { NarrationPlayerProvider } from "@/providers/NarrationPlayerProvider";
import { site } from "@/lib/site";

const sans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-sans", weight: "100 900" });
const mono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-mono", weight: "100 900" });

export const metadata = {
  title: { default: `${site.name} — ${site.headline}`, template: `%s · ${site.name}` },
  description: site.summary,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <BackgroundMusicProvider>
          <NarrationPlayerProvider>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <AudioDock />
          </NarrationPlayerProvider>
        </BackgroundMusicProvider>
      </body>
    </html>
  );
}
