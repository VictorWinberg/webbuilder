<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="textField" />
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
      textField: "",
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
            content: this.textField
          })
        });

        if (res.err) {
          console.error(res.err);
          return;
        }

        this.title = "";
        this.textField = "";
        await this.refreshPosts();
      }
    },
    showPost(index) {
      this.$router.push({
        name: "post-show",
        params: { index }
      });
    },
    editPost(index) {
      this.$router.push({
        name: "post-edit",
        params: { index }
      });
    },
    async removePost(index) {
      const res = await fetch(`/api/posts/${index}`, {
        method: "DELETE"
      });
      if (res.err) {
        console.error(res.err);
        return;
      }
      await this.refreshPosts();
    },
    valid() {
      return this.title !== "" && this.textField !== "";
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