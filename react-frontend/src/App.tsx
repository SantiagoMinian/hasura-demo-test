import React from 'react';
import './App.css';
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from './apolloClient';

import { HomeQuery } from './Home/home_query';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <HomeQuery />
    </ApolloProvider>
  );
}

export default App;
