import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layouts/Header';

export default function MyApp({ Component, pageProps }) {
    return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
    )
  }