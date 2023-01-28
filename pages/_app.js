import Construction from "../components/Construction";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Construction />
      <Footer />
    </>
  );
}

export default MyApp;
