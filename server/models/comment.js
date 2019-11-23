"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      comment: DataTypes.TEXT,
      postId: DataTypes.UUID
    },
    {}
  );
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      as: "post",
      constraints: false
    });
  };
  return Comment;
};
