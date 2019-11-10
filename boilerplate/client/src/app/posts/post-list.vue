<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="content" />
    <br />
    <button v-on:click="addPost()">CREATE</button>
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
  </div>
</template>

<script>
export default {
  name: "post-list",
  data() {
    return {
      title: "",
      content: "",
      posts: [],
      loading: false
    };
  },
  created() {
    this.refreshPosts();
  },
  methods: {
    async refreshPosts() {
      this.loading = true;
      const posts = await fetch("/api/posts");
      this.posts = await posts.json();
      this.loading = false;
    },
    async addPost() {
      if (this.valid()) {
        const res = await fetch("/api/posts", {
          method: "POST",
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

        this.title = "";
        this.content = "";
        await this.refreshPosts();
      }
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