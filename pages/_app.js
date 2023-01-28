import Script from "next/script";
import Construction from "../components/Construction";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZFHK8EKX3T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZFHK8EKX3T');`}
      </Script>
      <Nav />
      <Component {...pageProps} />
      <Construction />
      <Footer />
    </>
  );
}

export default MyApp;
