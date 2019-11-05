const { omit } = require("lodash/fp");

module.exports = (app, db) => {
  app.get("/api/posts", (req, res) => {
    return db.Post.findAll()
      .then(posts => res.send(posts))
      .catch(err => {
        console.log("Error querying posts", JSON.stringify(err));
        return res.send(err);
      });
  });

  app.post("/api/posts", (req, res) => {
    return db.Post.create(omit('id', req.body))
      .then(post => res.send(post))
      .catch(err => {
        console.log("Error creating a post", JSON.stringify(post));
        return res.status(400).send(err);
      });
  });

  app.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    return db.Post.findById(id)
      .then(post => res.send(post))
      .catch(err => {
        console.log("Error querying posts", JSON.stringify(err));
        return res.send(err);
      });
  });

  app.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    return db.Post.findById(id).then(post => {
      return post
        .update(omit('id', req.body))
        .then(() => res.send(post))
        .catch(err => {
          console.log("Error updating post", JSON.stringify(err));
          res.status(400).send(err);
        });
    });
  });

  app.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    return db.Post.findById(id)
      .then(post => post.destroy({ force: true }))
      .then(() => res.send({ id }))
      .catch(err => {
        console.log("Error deleting post", JSON.stringify(err));
        res.status(400).send(err);
      });
  });
};
