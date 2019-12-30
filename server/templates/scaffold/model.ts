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
      {{#unless relation.Entity}}
      {{name}}: DataTypes.{{TYPE}},
      {{/unless}}
      {{/fields}}
    },
    {}
  );
  {{Entity}}.associate = function(models: any) {
    {{#fields}}
    {{#if relation.Entity}}
    {{@root.Entity}}.{{type}}(models.{{relation.Entity}}, {});
    {{/if}}
    {{/fields}}
  };
  return {{Entity}};
};
