import { gql } from "apollo-server-express";
import readdirRec from "fs-readdir-recursive";

const typeDef = gql`
  scalar Text

  type Query
  type Mutation
`;

export const typeDefs = [
  typeDef,
  ...readdirRec(__dirname)
    .filter(f => f.includes("-model.") || f.includes("-resolver."))
    .map(file => {
      const typeDef = require("./" + file).typeDefs;
      if (!typeDef) {
        throw new Error("Missing GraphQL typeDef for: " + file);
      }
      return typeDef;
    })
];

export const resolvers = readdirRec(__dirname)
  .filter(f => f.includes("-resolver."))
  .map(file => {
    const resolver = require("./" + file).default;
    if (!resolver) {
      throw new Error("Missing GraphQL resolver for: " + file);
    }
    return resolver;
  });
