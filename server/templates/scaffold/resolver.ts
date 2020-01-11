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

type Context = {
  db: any;
};

type Args = {
  id: string;
};

export default {
  Query: {
    async {{Entity}}(_root: {}, { id }: Args, { db }: Context): Promise<{} | null> {
      return db.{{Entity}}.findByPk(id, {
        include: [{ all: true, nested: true }]
      });
    },
    async {{Entities}}(_root: {}, _args: Args, { db }: Context): Promise<[]> {
      return db.{{Entity}}.findAll({
        include: [{ all: true, nested: true }]
      });
    }
  },
  {{Entity}}: {
    {{#fields}}
    {{#switch type}}
    {{#case 'hasMany'}}
    {{Name}}: ({{@root.entity}}: any): Promise<[]> => {{@root.entity}}.get{{relation.Entities}}(),
    {{/case}}
    {{#case 'belongsTo'}}
    {{Name}}: ({{@root.entity}}: any): Promise<{} | null> => {{@root.entity}}.get{{relation.Entity}}(),
    {{/case}}
    {{/switch}}
    {{/fields}}
  },
  Mutation: {
    async create{{Entity}}(_root: {}, args: Args, { db }: Context): Promise<{} | null> {
      return db.{{Entity}}.create(omit("id", args));
    },
    async update{{Entity}}(_root: {}, { id, ...args }: Args, { db }: Context): Promise<{} | null> {
      const {{entity}} = await db.{{Entity}}.findByPk(id);
      if ({{entity}} == null) {
        return null;
      }
      return {{entity}}.update(args);
    },
    async remove{{Entity}}(_root: {}, { id }: Args, { db }: Context): Promise<{} | null> {
      const {{entity}} = await db.{{Entity}}.findByPk(id);
      if ({{entity}} == null) {
        return null;
      }
      return {{entity}}.destroy();
    }
  }
};
