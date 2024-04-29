// import '../styles/globals.css';

// import {TrackingProvider} from "../context/Tracking";

// import { NavBar, Footer} from "../components";

// function MyApp({ Component, pageProps })
// {
//   return(
//         <>
//           <TrackingProvider>
//             <NavBar />
//             <Component {...pageProps} />
//           </TrackingProvider>
//           <NavBar />
//           <Component {...pageProps} />
//           <Footer />
//         </>
//   );
// }

// export default MyApp;

import '../styles/globals.css';

import { TrackingProvider } from "../context/Tracking";
import { NavBar, Footer } from "../components";

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//     <TrackingProvider>
//       <div>Test: Inside TrackingProvider</div>
//       <NavBar />
//       <Component {...pageProps} />
//       <Footer />
//     </TrackingProvider>
//     </>
//   );
// }

// export default MyApp;


export default function App({ Component, pageProps }) {

  return  (
    <>
      <TrackingProvider>
        <NavBar/>
          <Component {...pageProps} />
        </TrackingProvider>
        <Footer/>
    </>
  );
}

