import { ApolloClient, InMemoryCache } from "@apollo/client";
import { FrontendConfig } from "./config";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const headers = {
  "X-Hasura-Admin-Secret": "adminsecret",
};

function generateApolloClient() {
  const httpLink = new HttpLink({
    uri: FrontendConfig.HasuraApiUrl,
    headers,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url: FrontendConfig.HasuraWebsocketApiUrl,
      connectionParams: {
        headers,
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    wsLink,
    httpLink
  );

  const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
  return apolloClient;
}

export { generateApolloClient };
