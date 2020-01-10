import { DataTypes } from "sequelize";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Customer {
    id: ID!
    name: String
    info: Text
    Orders: [Order]!
  }
`;

export default (sequelize: any) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      info: DataTypes.TEXT
    },
    {}
  );
  Customer.associate = function(models: any) {
    Customer.hasMany(models.Order, {});
  };
  return Customer;
};
