/* eslint-disable */
import { omit } from "lodash/fp";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    Customer(id: ID!): Customer
    Customers: [Customer!]!
  }
  extend type Mutation {
    createCustomer(name: String, info: Text): Customer
    updateCustomer(id: ID!, name: String, info: Text): Customer
    removeCustomer(id: ID!): Customer
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
    },
    // @ts-ignore
    async updateCustomer(root, { id, ...fields }, { db }) {
      const customer = await db.Customer.findByPk(id);
      if (customer == null) {
        return null;
      }
      return customer.update(fields);
    },
    // @ts-ignore
    async removeCustomer(root, { id, ...fields }, { db }) {
      const customer = await db.Customer.findByPk(id);
      if (customer == null) {
        return null;
      }
      return customer.destroy();
    }
  }
};
