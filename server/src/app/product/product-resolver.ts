/* eslint-disable */
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Product(id: String!): Product
  }
  extend type Mutation {
    createProduct(name: String!): Product!
  }
`;

export default {
  Query: {
    // @ts-ignore
    async Product(root, { id }, { db }) {
      return db.Product.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    }
  },
  Mutation: {
    // @ts-ignore
    async createProduct(root, { name }, { db }) {
      return db.Product.create({ name });
    }
  }
};
