<template>
  <div>
    <span>PostId</span>
    <input type="text" v-model="postId" />
    <br />
    <textarea v-model="comment" />
    <br />
    <button v-on:click="addComment()">CREATE</button>
    <ul>
      <li v-for="comment in comments" v-bind:key="comment.id">
        <hr />
        <b>{{ comment.comment }}</b>
        <br />
        PostId: {{ comment.postId }}
        <br />
        <button v-on:click="showComment(comment.id)">SHOW</button>
        <button v-on:click="editComment(comment.id)">EDIT</button>
        <button v-on:click="removeComment(comment.id)">REMOVE</button>
      </li>
      <hr />
    </ul>
  </div>
</template>

<script>
export default {
  name: "comment-list",
  data() {
    return {
      postId: "",
      comment: "",
      comments: [],
      loading: false
    };
  },
  created() {
    this.refreshComments();
  },
  methods: {
    async refreshComments() {
      this.loading = true;
      const comments = await fetch("/api/comments");
      this.comments = await comments.json();
      this.loading = false;
    },
    async addComment() {
      if (this.valid()) {
        const res = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            postId: this.postId,
            comment: this.comment
          })
        });

        if (res.err) {
          console.error(res.err);
          return;
        }

        this.postId = "";
        this.comment = "";
        await this.refreshComments();
      }
    },
    showComment(id) {
      this.$router.push({
        name: "comment-show",
        params: { id }
      });
    },
    editComment(id) {
      this.$router.push({
        name: "comment-edit",
        params: { id }
      });
    },
    async removeComment(id) {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE"
      });
      if (res.err) {
        console.error(res.err);
        return;
      }
      await this.refreshComments();
    },
    valid() {
      return this.title !== "" && this.content !== "";
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>