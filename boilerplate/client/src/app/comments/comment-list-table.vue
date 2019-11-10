<template>
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
</template>

<script>
export default {
  name: "comment-list-table",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.refreshComments();
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    async refreshComments() {
      this.loading = true;
      await this.$store.dispatch("refreshComments");
      this.loading = false;
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