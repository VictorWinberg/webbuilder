/* eslint-disable */
import { omit } from "lodash/fp";
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
  Customer: {
    // @ts-ignore
    Orders: customer => customer.getOrders()
  },
  Mutation: {
    // @ts-ignore
    async createCustomer(root, fields, { db }) {
      return db.Customer.create(omit("id", fields));
    }
    // // @ts-ignore
    // async updateCustomer(root, fields, { db }) {
    //   return db.Customer.update(omit("id", fields));
    // },
    // // @ts-ignore
    // async removeCustomer(root, fields, { db }) {
    //   return db.Customer.remove(omit("id", fields));
    // }
  }
};
