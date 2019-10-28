"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          title: "Hello World!",
          content: "Hello, is this World?",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "AVInc",
          content: "AVInc is a brand new company, delivering IT solutions.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Girlfriend",
          content: "I like my girlfriend!",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
