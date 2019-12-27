const { omit } = require("lodash/fp");

module.exports = (app, db) => {
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await db.Post.findAll();
      return res.send(posts);
    } catch (err) {
      console.log("Error querying posts", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const post = await db.Post.create(omit("id", req.body));
      return res.send(post);
    } catch (err) {
      console.log("Error creating a post", JSON.stringify(err));
      return res.status(400).send(err);
    }
  });

  app.get("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await db.Post.findById(id, { include: [{ all: true }] });
      return res.send(post);
    } catch (err) {
      console.log("Error querying posts", JSON.stringify(err));
      return res.send(err);
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await db.Post.findById(id);
      await post.update(omit("id", req.body));
      return res.send(post);
    } catch (err) {
      console.log("Error updating post", JSON.stringify(err));
      res.status(400).send(err);
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const post = await db.Post.findById(id);
      await post.destroy({ force: true });
      return res.send({ id });
    } catch (err) {
      console.log("Error deleting post", JSON.stringify(err));
      res.status(400).send(err);
    }
  });
};
