import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  const {{Entity}} = sequelize.define(
    "{{Entity}}",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      {{#fields}}
      {{^hasRelation}}
      {{name}}: DataTypes.{{TYPE}},
      {{/hasRelation}}
      {{/fields}}
    },
    {}
  );
  {{Entity}}.associate = function(models: any) {
    {{#fields}}
    {{#hasRelation}}
    {{Entity}}.{{type}}(models.{{relation.Entity}}, {});
    {{/hasRelation}}
    {{/fields}}
  };
  return {{Entity}};
};
