import Script from "next/script";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../styles/globals.css";

// Mantine
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZFHK8EKX3T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());
gtag('config', 'G-ZFHK8EKX3T');`}
      </Script>
      <MantineProvider
        theme={{
          colorScheme: "dark",
        }}
      >
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </MantineProvider>
    </>
  );
}

export default MyApp;
