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
      title: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {}
  );
  return <%Component%>;
};
