/* eslint-disable */
import { gql } from "apollo-server-express";
import readdirRec from "fs-readdir-recursive";

import Customers from "./app/customer/customer-graphql";
import Orders from "./app/order/order-graphql";

const typeDef = gql`
  type Query
  type Mutation
`;

readdirRec(__dirname)
  .filter(f => f.includes("-graphql."))
  .forEach(file => {
    console.log(file);
    console.log(require("./" + file).default);
  });

export const typeDefs = [typeDef, Customers.typeDefs, Orders.typeDefs];

export const resolvers = [Customers.resolvers, Orders.resolvers];
