import { DataTypes } from "sequelize";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type {{Entity}} {
    id: ID!
    {{#fields}}
    {{#switch type}}
    {{#case 'hasMany'}}
    {{Name}}: [{{relation.Entity}}]!
    {{/case}}
    {{#case 'belongsTo'}}
    {{Name}}: {{relation.Entity}}
    {{/case}}
    {{#otherwise ''}}
    {{name}}: {{Type}}
    {{/otherwise}}
    {{/switch}}
    {{/fields}}
  }
`;

export default (sequelize: any): {} => {
  const {{Entity}} = sequelize.define(
    "{{Entity}}",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      {{#fields}}
      {{#unless relation.entity}}
      {{name}}: DataTypes.{{TYPE}},
      {{/unless}}
      {{/fields}}
    },
    {}
  );
  {{Entity}}.associate = function(models: any): void {
    {{#fields}}
    {{#if relation.entity}}
    {{@root.Entity}}.{{type}}(models.{{relation.Entity}}, {});
    {{/if}}
    {{/fields}}
    return;
  };
  return {{Entity}};
};
