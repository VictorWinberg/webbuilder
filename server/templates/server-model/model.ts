import { DataTypes } from "sequelize";

export default (sequelize: any) => {
  const <%Component%> = sequelize.define(
    "<%Component%>",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      <%#fields%>
      <%^hasRelation%>
      <%name%>: DataTypes.<%TYPE%>,
      <%/hasRelation%>
      <%/fields%>
    },
    {}
  );
  <%Component%>.associate = function(models: any) {
    <%#fields%>
    <%#hasRelation%>
    <%Component%>.<%type%>(models.<%relation.Entity%>, {
      as: "<%name%>",
      constraints: false
    });
    <%/hasRelation%>
    <%/fields%>
  };
  return <%Component%>;
};
