import '../styles/globals.css';
import { TrackingProvider } from '../context/Tracking';
import { NavBar, Footer } from '../components/index';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <NavBar />
        <Component {...pageProps} />
      </TrackingProvider>
        <Footer />
    </>
  );
}

export default MyApp;
