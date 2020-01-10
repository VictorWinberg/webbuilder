/* eslint-disable */
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Order {
    id: String!
    delivered: Boolean
    Customer: Customer
  }
  extend type Query {
    Order(id: String!): Order
  }
  extend type Mutation {
    createOrder(customerId: String!): Order!
  }
`;

export const resolvers = {
  Query: {
    // @ts-ignore
    async Order(root, { id }, { db }) {
      return db.Order.findByPk(id, {
        include: [{ all: true }]
      });
    }
  },
  Mutation: {
    // @ts-ignore
    async createOrder(root, { delivered, customerId }, { db }) {
      return db.Order.create({ delivered, customerId });
    }
  }
};


export default {typeDefs, resolvers}