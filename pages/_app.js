import Script from "next/script";
import "../styles/globals.css";
// header for entire app
import Header from "../components/utils/header";

function MyApp({ Component, pageProps }) {

  return (
    <div className="bg-light-primary dark:bg-dark-primary text-black-1 dark:text-white-2  min-h-screen">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZFHK8EKX3T"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());
gtag('config', 'G-ZFHK8EKX3T');`}
      </Script>

        <Header />
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
