import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from "react-apollo";

import CodeTour from "./CodeTour";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://localhost:3000/graphql" // === CodeTours GraphQL server
  })
});

export default () => (
  <ApolloProvider client={client}>
    <CodeTour tourRepository="partyparrot/codetours-starter-kit" />
  </ApolloProvider>
);
