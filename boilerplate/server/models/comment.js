"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      comment: DataTypes.TEXT,
      postId: DataTypes.INTEGER
    },
    {}
  );
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post"
    });
  };
  return Comment;
};
