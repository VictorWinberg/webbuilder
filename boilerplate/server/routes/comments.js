const { omit } = require("lodash/fp");

module.exports = (app, db) => {
  app.get("/api/comments", async (req, res) => {
    try {
      const comments = await db.Comment.findAll();
      return res.send(comments);
    } catch (err) {
      console.log("Error querying postCommens", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.post("/api/comments", async (req, res) => {
    try {
      const comment = await db.Comment.create(omit("id", req.body));
      return res.send(comment);
    } catch (err) {
      console.log("Error creating a comment", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await db.Comment.findById(id, {
        include: [{ all: true }]
      });
      return res.send(comment);
    } catch (err) {
      console.log("Error querying comments", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.put("/api/comments/:id", async (req, res) => {
    const { id, postId } = req.params;
    try {
      const comment = await db.Comment.findById(id);
      await comment.update(omit("id", req.body));
      return res.send(comment);
    } catch (err) {
      console.log("Error updating comment", JSON.stringify(err));
      res.status(400).send(err);
    }
  });

  app.delete("/api/comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await db.Comment.findById(id);
      await comment.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.log("Error deleting comment", JSON.stringify(err));
      res.status(400).send(err);
    }
  });
};
