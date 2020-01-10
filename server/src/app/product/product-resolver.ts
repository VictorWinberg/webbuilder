/* eslint-disable */
import { omit } from "lodash/fp";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Product(id: String!): Product
    Products: [Product!]!
  }
  extend type Mutation {
    createProduct(name: String!, info: String!): Product!
  }
`;

export default {
  Query: {
    // @ts-ignore
    async Product(root, { id }, { db }) {
      return db.Product.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    // @ts-ignore
    async Products(root, args, { db }) {
      return db.Product.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  Product: {},
  Mutation: {
    // @ts-ignore
    async createProduct(root, fields, { db }) {
      return db.Product.create(omit("id", fields));
    }
    // // @ts-ignore
    // async updateProduct(root, fields, { db }) {
    //   return db.Product.update(omit("id", fields));
    // },
    // // @ts-ignore
    // async removeProduct(root, fields, { db }) {
    //   return db.Product.remove(omit("id", fields));
    // }
  }
};
