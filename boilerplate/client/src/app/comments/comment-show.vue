<template>
  <div>
    <h1>{{ comment.comment }}</h1>
    <p>PostId: {{ comment.postId }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="editComment(id)">EDIT</button>
  </div>
</template>

<script>
export default {
  name: "comment-show",
  props: {
    id: { required: true }
  },
  asyncComputed: {
    comment: {
      async get() {
        const res = await fetch(`/api/comments/${this.id}`);
        if (res.err) {
          console.error(res.err);
          return;
        }
        const json = await res.json();
        return json;
      },
      default: {}
    }
  },
  methods: {
    editComment(id) {
      this.$router.push({
        name: "comment-edit",
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