import { DataTypes } from "sequelize";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Order {
    id: String!
    delivered: Boolean
    Customer: Customer
  }
`;

export default (sequelize: any) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      delivered: DataTypes.BOOLEAN
    },
    {}
  );
  Order.associate = function(models: any) {
    Order.belongsTo(models.Customer, {});
    Order.hasMany(models.Product, {});
  };
  return Order;
};
