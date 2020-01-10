/* eslint-disable */
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

export default {
  Query: {
    // @ts-ignore
    async Order(root, { id }, { db }) {
      return db.Order.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    // @ts-ignore
    async Orders(root, args, { db }) {
      return db.Order.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  Order: {
    // @ts-ignore
    Customer: order => order.getCustomer(),
    // @ts-ignore
    Products: order => order.getProducts()
  },
  Mutation: {
    // @ts-ignore
    async createOrder(root, fields, { db }) {
      return db.Order.create(omit("id", fields));
    },
    // @ts-ignore
    async updateOrder(root, { id, ...fields }, { db }) {
      const order = await db.Order.findByPk(id);
      if (order == null) {
        return null;
      }
      return order.update(fields);
    },
    // @ts-ignore
    async removeOrder(root, { id, ...fields }, { db }) {
      const order = await db.Order.findByPk(id);
      if (order == null) {
        return null;
      }
      return order.destroy();
    }
  }
};
