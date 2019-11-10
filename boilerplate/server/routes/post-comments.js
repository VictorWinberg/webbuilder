const { omit } = require("lodash/fp");

module.exports = (app, db) => {
  app.get("/api/post_comments", async (req, res) => {
    try {
      const postComments = await db.PostComment.findAll();
      return res.send(postComments);
    } catch (err) {
      console.log("Error querying postCommens", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.post("/api/post_comments", async (req, res) => {
    try {
      const postComment = await db.PostComment.create(omit("id", req.body));
      return res.send(postComment);
    } catch (err) {
      console.log("Error creating a postComment", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/post_comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const postComment = await db.PostComment.findById(id, {
        include: [{ all: true }]
      });
      return res.send(postComment);
    } catch (err) {
      console.log("Error querying postComments", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.put("/api/post_comments/:id", async (req, res) => {
    const { id, postId } = req.params;
    try {
      const postComment = await db.PostComment.findById(id);
      await postComment.update(omit("id", req.body));
      return res.send(postComment);
    } catch (err) {
      console.log("Error updating postComment", JSON.stringify(err));
      res.status(400).send(err);
    }
  });

  app.delete("/api/post_comments/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const postComment = await db.PostComment.findById(id);
      await postComment.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.log("Error deleting postComment", JSON.stringify(err));
      res.status(400).send(err);
    }
  });
};
