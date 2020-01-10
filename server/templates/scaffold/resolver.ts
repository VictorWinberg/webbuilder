/* eslint-disable */
import { omit } from "lodash/fp";
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    {{Entity}}(id: ID!): {{Entity}}
    {{Entities}}: [{{Entity}}!]!
  }
  extend type Mutation {
    create{{Entity}}(
      {{#fields}}
      {{#unless relation.entity}}
      {{name}}: {{Type}},
      {{/unless}}
      {{/fields}}
    ): {{Entity}}
    update{{Entity}}(
      id: ID!,
      {{#fields}}
      {{#unless relation.entity}}
      {{name}}: {{Type}},
      {{/unless}}
      {{/fields}}
    ): {{Entity}}
    remove{{Entity}}(id: ID!): {{Entity}}
  }
`;

export default {
  Query: {
    // @ts-ignore
    async {{Entity}}(root, { id }, { db }) {
      return db.{{Entity}}.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    // @ts-ignore
    async {{Entities}}(root, args, { db }) {
      return db.{{Entity}}.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  {{Entity}}: {
    {{#fields}}
    {{#switch type}}
    {{#case 'hasMany'}}
    // @ts-ignore
    {{Name}}: {{@root.entity}} => {{@root.entity}}.get{{relation.Entities}}(),
    {{/case}}
    {{#case 'belongsTo'}}
    // @ts-ignore
    {{Name}}: {{@root.entity}} => {{@root.entity}}.get{{relation.Entity}}(),
    {{/case}}
    {{/switch}}
    {{/fields}}
  },
  Mutation: {
    // @ts-ignore
    async create{{Entity}}(root, fields, { db }) {
      return db.{{Entity}}.create(omit("id", fields));
    },
    // @ts-ignore
    async update{{Entity}}(root, { id, ...fields }, { db }) {
      const {{entity}} = await db.{{Entity}}.findByPk(id);
      if ({{entity}} == null) {
        return null;
      }
      return {{entity}}.update(fields);
    },
    // @ts-ignore
    async remove{{Entity}}(root, { id, ...fields }, { db }) {
      const {{entity}} = await db.{{Entity}}.findByPk(id);
      if ({{entity}} == null) {
        return null;
      }
      return {{entity}}.destroy();
    }
  }
};
