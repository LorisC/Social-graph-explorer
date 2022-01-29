import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {DefaultApolloClient} from "@vue/apollo-composable";

const cache = new InMemoryCache();

export const createApolloClient = ({uri}) => {
    const httpLink = new HttpLink({uri})
    return [DefaultApolloClient, new ApolloClient({
        link: httpLink,
        cache
    })]
}
