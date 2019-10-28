"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define(
    "PostComment",
    {
      comment: DataTypes.TEXT,
      postId: DataTypes.INTEGER
    },
    {}
  );
  PostComment.associate = function(models) {
    PostComment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post"
    });
  };
  return PostComment;
};
