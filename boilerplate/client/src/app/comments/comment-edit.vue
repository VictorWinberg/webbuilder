<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="comment.postId" />
    <br />
    <textarea v-model="comment.comment" />
    <br />
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="showComment(id)">SHOW</button>
    <button v-on:click="editComment(id)">SAVE</button>
  </div>
</template>

<script>
export default {
  name: "comment-edit",
  props: {
    id: { required: true }
  },
  asyncComputed: {
    comment: {
      async get() {
        const res = await fetch(`/api/comments/${this.id}`);
        const json = await res.json();
        return json;
      },
      default: {}
    }
  },
  methods: {
    async editComment(id) {
      if (this.valid()) {
        const res = await fetch(`/api/comments/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.title,
            content: this.content
          })
        });
        if (res.err) {
          console.error(res.err);
          return;
        }
        this.back();
      }
    },
    valid() {
      return this.title !== "" && this.content !== "";
    },
    showComment(id) {
      this.$router.push({
        name: "comment-show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "comment-list" });
    }
  }
};
</script>

<style scoped>
</style>