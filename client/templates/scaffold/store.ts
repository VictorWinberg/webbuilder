import gql from "graphql-tag";
import { apolloClient } from "@/plugins/apollo";

export default {
  {{entity}}: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: {}, payload: {}): Promise<void> {
        const res = await apolloClient.mutate({
          mutation: gql`
            mutation(
              {{#fields}}
              {{#unless relation.entity}}
              ${{name}}: {{Type}},
              {{/unless}}
              {{/fields}}
              ) {
              create{{Entity}}(
                {{#fields}}
                {{#unless relation.entity}}
                {{name}}: ${{name}},
                {{/unless}}
                {{/fields}}
              ) {
                {{#fields}}
                {{#unless relation.entity}}
                {{name}}
                {{/unless}}
                {{/fields}}
              }
            }
          `,
          variables: payload
        });

        if (res.errors) {
          throw new Error(JSON.stringify(res.errors));
        }
      },
      async update(_: {}, [id, payload]: [string, {}]): Promise<void> {
        const res = await apolloClient.mutate({
          mutation: gql`
            mutation(
              $id: ID!,
              {{#fields}}
              {{#unless relation.entity}}
              ${{name}}: {{Type}},
              {{/unless}}
              {{/fields}}
              ) {
              update{{Entity}}(
                id: $id,
                {{#fields}}
                {{#unless relation.entity}}
                {{name}}: ${{name}},
                {{/unless}}
                {{/fields}}
              ) {
                {{#fields}}
                {{#unless relation.entity}}
                {{name}}
                {{/unless}}
                {{/fields}}
              }
            }
          `,
          variables: {
            id,
            ...payload
          }
        });

        if (res.errors) {
          throw new Error(JSON.stringify(res.errors));
        }
      },
      async remove(_: {}, [id]: [string]): Promise<void> {
        const res = await apolloClient.mutate({
          mutation: gql`
            mutation($id: ID!) {
              remove{{Entity}}(id: $id) {
                {{#fields}}
                {{#unless relation.entity}}
                {{name}}
                {{/unless}}
                {{/fields}}
              }
            }
          `,
          variables: { id }
        });

        if (res.errors) {
          throw new Error(JSON.stringify(res.errors));
        }
      }
    }
  }
};
