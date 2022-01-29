import {createApp, h, provide} from 'vue'
import {createApolloClient} from "./graphql/apolloClient";
import App from './App.vue'


global = globalThis

const app = createApp({
    setup() {
      provide(...createApolloClient({uri: "https://api.cybertino.io/connect/"}))
    },
    render: () => h(App)
});

app.mount("#app")