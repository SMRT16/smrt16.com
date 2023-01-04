import Head from "next/head";
import ReactGA from "react-ga4";

const Header = (props) => {
  ReactGA.initialize("G-WXLG87CBSY");
  ReactGA.send("pageview");
  return (
    <Head>
        <meta charSet="utf-8" />
        {!props.title ?
        <title>SMRT16 ERC-20 Token with multi-level referral program built into the smart contract</title>
        :
        <title>{props.title}</title>}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=2"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>

        <meta property="og:title" content="SMRT16 ERC-20 Token" />
        <meta property="og:site_name" content="SMRT16" />
        <meta property="og:url" content="https://smrt16.com" />
        <meta property="og:description" content="SMRT16 is an ERC-20 token running in Polygon. This website is Decentralised App (DApp) of the token sale with multi-level referral program built into the smart contract." />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="/previewm.jpeg" />
        <meta content="origin" name="referrer" />
        <meta content="/assets/smrt16-with-text-logo.png" itemprop="image" />
      </Head>
  );
};

export default Header;
