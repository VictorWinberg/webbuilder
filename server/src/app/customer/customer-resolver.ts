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

type Context = {
  db: any;
};

type Args = {
  id: string;
};

export default {
  Query: {
    async Customer(
      _root: {},
      { id }: Args,
      { db }: Context
    ): Promise<{} | null> {
      return db.Customer.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    async Customers(_root: {}, _args: Args, { db }: Context): Promise<[]> {
      return db.Customer.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  Customer: {
    Orders: (customer: any): Promise<[]> => customer.getOrders()
  },
  Mutation: {
    async createCustomer(
      _root: {},
      args: Args,
      { db }: Context
    ): Promise<{} | null> {
      return db.Customer.create(omit("id", args));
    },
    async updateCustomer(
      _root: {},
      { id, ...args }: Args,
      { db }: Context
    ): Promise<{} | null> {
      const customer = await db.Customer.findByPk(id);
      if (customer == null) {
        return null;
      }
      return customer.update(args);
    },
    async removeCustomer(
      _root: {},
      { id }: Args,
      { db }: Context
    ): Promise<{} | null> {
      const customer = await db.Customer.findByPk(id);
      if (customer == null) {
        return null;
      }
      return customer.destroy();
    }
  }
};
