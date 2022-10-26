import '../src/tailwind.css'
import { ApolloProvider } from '@apollo/client'
import Client from '../src/graphql/Client'
import { useEffect } from 'react'
import Router from 'next/router'
import NProgress from 'nprogress';
import '../public/css/nprogress.custom.css'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const start = () => NProgress.start()
    const end = () => NProgress.done()

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)

    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  })
  return (
    <ApolloProvider client={Client}>
      <Component {...pageProps} />
    </ApolloProvider>)
}

export default MyApp
