import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `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`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
