import Vue from "vue";
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: "/graphql" // You should use an absolute URL here
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});
