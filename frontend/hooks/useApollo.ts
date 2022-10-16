import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { generateApolloClient } from "../apollo-client";

let client: ApolloClient<NormalizedCacheObject>;

const useApollo = () => {
  if (!client) client = generateApolloClient();

  return client;
};

export { useApollo };
