import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import { ClientOnly } from '../components/ClientOnly';
import { useApollo } from '../hooks/useApollo';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo();
  
  return (
    <ClientOnly>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ClientOnly>
  );
}

export default MyApp
