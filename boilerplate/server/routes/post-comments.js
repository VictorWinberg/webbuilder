module.exports = (app, db) => {
  app.get("/api/posts/:postId/comments", (req, res) => {
    const { postId } = req.params;
    return db.PostComment.findAll({
      where: {
        postId
      }
    })
      .then(postComments => res.send(postComments))
      .catch(err => {
        console.log("Error querying postCommens", JSON.stringify(err));
        return res.send(err);
      });
  });

  app.post("/api/posts/:postId/comments", (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    return db.PostComment.create({
      comment,
      postId
    })
      .then(postComment => res.send(postComment))
      .catch(err => {
        console.log(
          "Error creating a postComment",
          JSON.stringify(postComment)
        );
        return res.status(400).send(err);
      });
  });

  app.get("/api/posts/:postId/comments/:id", (req, res) => {
    const { id, postId } = req.params;
    return db.PostComment.findOne({ where: { id, postId } })
      .then(postComment => res.send(postComment))
      .catch(err => {
        console.log("Error querying postComments", JSON.stringify(err));
        return res.send(err);
      });
  });

  app.put("/api/posts/:postId/comments/:id", (req, res) => {
    const { id, postId } = req.params;
    return db.PostComment.findOne({ where: { id, postId } }).then(
      postComment => {
        const { comment } = req.body;
        return postComment
          .update({ comment })
          .then(() => res.send(postComment))
          .catch(err => {
            console.log("Error updating postComment", JSON.stringify(err));
            res.status(400).send(err);
          });
      }
    );
  });

  app.delete("/api/posts/:postId/comments/:id", (req, res) => {
    const { id, postId } = req.params;
    return db.PostComment.findOne({ where: { id, postId } })
      .then(postComment => postComment.destroy({ force: true }))
      .then(() => res.send({ id }))
      .catch(err => {
        console.log("Error deleting postComment", JSON.stringify(err));
        res.status(400).send(err);
      });
  });
};
