import { ApolloClient, InMemoryCache, HttpLink, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
});

// Middleware to add the authorization header to requests
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('authToken');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Concatenate the middleware and the HTTP link
const link = concat(authLink, httpLink);

// Create the Apollo client
const graphqlClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default graphqlClient;