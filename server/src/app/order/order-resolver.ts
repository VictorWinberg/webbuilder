/* eslint-disable */
import { omit } from "lodash/fp";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Order(id: String!): Order
    Orders: [Order!]!
  }
  extend type Mutation {
    createOrder(name: String!, info: String!): Order!
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
    }
    // // @ts-ignore
    // async updateOrder(root, fields, { db }) {
    //   return db.Order.update(omit("id", fields));
    // },
    // // @ts-ignore
    // async removeOrder(root, fields, { db }) {
    //   return db.Order.remove(omit("id", fields));
    // }
  }
};
