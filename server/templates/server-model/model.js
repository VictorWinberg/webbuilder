"use strict";
module.exports = (sequelize, DataTypes) => {
  const <%Component%> = sequelize.define(
    "<%Component%>",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      title: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {}
  );
  return <%Component%>;
};
