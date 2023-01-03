import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/lato"
import "@fontsource/plus-jakarta-sans"
import '../styles/globals.scss'
import { SMRT16Provider } from "../components/SMRT16Context"; 

function MyApp({ Component, pageProps }) {

  return (
    <SMRT16Provider>
      <Component {...pageProps} />
    </SMRT16Provider>
    );
}

export default MyApp;