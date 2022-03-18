import type { AppProps } from 'next/app'
import Modal from '../components/modals/modal';

import '../src/styles/globals.scss'
import { wrapper } from '../store/root-reducer'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Modal/>
  </>
}

export default wrapper.withRedux(MyApp);
