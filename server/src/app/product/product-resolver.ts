/* eslint-disable */
import { omit } from "lodash/fp";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Product(id: ID!): Product
    Products: [Product!]!
  }
  extend type Mutation {
    createProduct(name: String): Product
    updateProduct(id: ID!, name: String): Product
    removeProduct(id: ID!): Product
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
    },
    // @ts-ignore
    async updateProduct(root, { id, ...fields }, { db }) {
      const product = await db.Product.findByPk(id);
      if (product == null) {
        return null;
      }
      return product.update(fields);
    },
    // @ts-ignore
    async removeProduct(root, { id, ...fields }, { db }) {
      const product = await db.Product.findByPk(id);
      if (product == null) {
        return null;
      }
      return product.destroy();
    }
  }
};
