import Layout from '../components/layout'
import '../globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function MyApp({ Component, pageProps }) {
  return <Layout><Component {...pageProps} /></Layout>
}