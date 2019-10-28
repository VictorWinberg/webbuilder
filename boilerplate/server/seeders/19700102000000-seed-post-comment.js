"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "PostComments",
      [
        {
          comment: "Yes, this is Hello World!",
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          comment: "Hi Woerld!",
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          comment: "I rate AVInc 5/5!",
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          comment: "Would recommend AVInc 2/5!",
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          comment: "5/5",
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          comment: "She is the cutest!",
          postId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PostComments", null, {});
  }
};
