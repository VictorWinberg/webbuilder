<template>
  <div>
    <span>PostId</span>
    <input type="text" v-model="postId" />
    <br />
    <textarea v-model="comment" />
    <br />
    <button v-on:click="addComment()">CREATE</button>
  </div>
</template>

<script>
export default {
  name: "comment-new",
  data() {
    return {
      postId: "",
      comment: ""
    };
  },
  methods: {
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
    valid() {
      return this.title !== "" && this.content !== "";
    }
  }
};
</script>

<style>
</style>