"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
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
  Post.associate = function(models) {
    Post.hasMany(models.Comment, {
      as: "comments",
      constraints: false
    });
  };
  return Post;
};
