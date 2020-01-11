import { omit } from "lodash/fp";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Order(id: ID!): Order
    Orders: [Order!]!
  }
  extend type Mutation {
    createOrder(delivered: Boolean): Order
    updateOrder(id: ID!, delivered: Boolean): Order
    removeOrder(id: ID!): Order
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
    async Order(_root: {}, { id }: Args, { db }: Context): Promise<{} | null> {
      return db.Order.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    async Orders(_root: {}, _args: Args, { db }: Context): Promise<[]> {
      return db.Order.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  Order: {
    Customer: (order: any): Promise<{} | null> => order.getCustomer(),
    Products: (order: any): Promise<[]> => order.getProducts()
  },
  Mutation: {
    async createOrder(
      _root: {},
      args: Args,
      { db }: Context
    ): Promise<{} | null> {
      return db.Order.create(omit("id", args));
    },
    async updateOrder(
      _root: {},
      { id, ...args }: Args,
      { db }: Context
    ): Promise<{} | null> {
      const order = await db.Order.findByPk(id);
      if (order == null) {
        return null;
      }
      return order.update(args);
    },
    async removeOrder(
      _root: {},
      { id }: Args,
      { db }: Context
    ): Promise<{} | null> {
      const order = await db.Order.findByPk(id);
      if (order == null) {
        return null;
      }
      return order.destroy();
    }
  }
};
