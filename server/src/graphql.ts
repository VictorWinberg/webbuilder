/* eslint-disable */
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Customer {
    id: String!
    name: String!
    info: String!
    Orders: [Order]
  }
  type Order {
    id: String!
    delivered: Boolean
    Customer: Customer
  }
  type Query {
    Customer(id: String!): Customer
    Customers: [Customer!]!
    Order(id: String!): Order
  }
  type Mutation {
    createCustomer(name: String!, info: String!): Customer!
    createOrder(customerId: String!): Order!
  }
`;

export const resolvers = {
  Query: {
    // @ts-ignore
    async Customer(root, { id }, { db }) {
      return db.Customer.findByPk(id, {
        include: [{ all: true }]
      });
    },
    // @ts-ignore
    async Customers(root, args, { db }) {
      return db.Customer.findAll({
        include: [{ all: true, nested: true }]
      });
    },
    // @ts-ignore
    async Order(root, { id }, { db }) {
      return db.Order.findByPk(id, {
        include: [{ all: true }]
      });
    }
  },
  Mutation: {
    // @ts-ignore
    async createCustomer(root, { name, info }, { db }) {
      return db.Customer.create({
        name,
        info
      });
    },
    // @ts-ignore
    async createOrder(root, { delivered, customerId }, { db }) {
      return db.Order.create({ delivered, customerId });
    }
  }
};
