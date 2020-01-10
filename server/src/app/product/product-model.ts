import { DataTypes } from "sequelize";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Product {
    id: String!
    name: String!
  }
`;

export default (sequelize: any) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models: any) {};
  return Product;
};
