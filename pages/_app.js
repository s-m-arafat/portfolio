import Script from "next/script";
import "../styles/globals.css";
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
import Header from "../components/utils/header";

function MyApp({ Component, pageProps }) {

  return (
    <div className="dark:bg-dark-primary text-light-black-1 dark:text-dark-1 bg-light-primary  min-h-screen">
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
