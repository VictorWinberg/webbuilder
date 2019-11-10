"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT
    },
    {}
  );
  Post.associate = function(models) {
    Post.hasMany(models.Comment, { as: "comments" });
  };
  return Post;
};
