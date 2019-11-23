<template>
  <ul>
    <li v-for="post in posts" v-bind:key="post.id">
      <hr />
      <b>{{ post.title }}</b>
      <br />
      {{ post.content }}
      <br />
      <button v-on:click="showPost(post.id)">SHOW</button>
      <button v-on:click="editPost(post.id)">EDIT</button>
      <button v-on:click="removePost(post.id)">REMOVE</button>
    </li>
    <hr />
  </ul>
</template>

<script>
export default {
  name: "post-list-table",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.refreshPosts();
  },
  computed: {
    posts() {
      return this.$store.state.post.list;
    }
  },
  methods: {
    async refreshPosts() {
      this.loading = true;
      await this.$store.dispatch("post/refresh");
      this.loading = false;
    },
    showPost(id) {
      this.$router.push({
        name: "post-show",
        params: { id }
      });
    },
    editPost(id) {
      this.$router.push({
        name: "post-edit",
        params: { id }
      });
    },
    async removePost(id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE"
      });
      if (res.err) {
        console.error(res.err);
        return;
      }
      await this.refreshPosts();
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