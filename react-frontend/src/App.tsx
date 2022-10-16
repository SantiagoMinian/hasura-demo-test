import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './apolloClient';
import { Home } from './Home/home';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Home />
    </ApolloProvider>
  );
}

export default App;
