/* eslint-disable */
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Customer(id: String!): Customer
    Customers: [Customer!]!
  }
  extend type Mutation {
    createCustomer(name: String!, info: String!): Customer!
  }
`;

export default {
  Query: {
    // @ts-ignore
    async Customer(root, { id }, { db }) {
      return db.Customer.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    // @ts-ignore
    async Customers(root, args, { db }) {
      return db.Customer.findAll({
        include: [{ all: true, nested: true }]
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
    }
  }
};
