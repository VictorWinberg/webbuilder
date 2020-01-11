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

type Context = {
  db: any;
};

type Args = {
  id: string;
};

export default {
  Query: {
    async Product(
      _root: {},
      { id }: Args,
      { db }: Context
    ): Promise<{} | null> {
      return db.Product.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    async Products(_root: {}, _args: Args, { db }: Context): Promise<[]> {
      return db.Product.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  Product: {},
  Mutation: {
    async createProduct(
      _root: {},
      args: Args,
      { db }: Context
    ): Promise<{} | null> {
      return db.Product.create(omit("id", args));
    },
    async updateProduct(
      _root: {},
      { id, ...args }: Args,
      { db }: Context
    ): Promise<{} | null> {
      const product = await db.Product.findByPk(id);
      if (product == null) {
        return null;
      }
      return product.update(args);
    },
    async removeProduct(
      _root: {},
      { id }: Args,
      { db }: Context
    ): Promise<{} | null> {
      const product = await db.Product.findByPk(id);
      if (product == null) {
        return null;
      }
      return product.destroy();
    }
  }
};
