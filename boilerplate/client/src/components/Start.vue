<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="textField" />
    <br />
    <button v-on:click="addPost()">
      CREATE
    </button>
    <ul>
      <li v-for="(post, index) in posts" v-bind:key="index">
        <hr />
        <b>{{ post.title }}</b>
        <br />
        {{ post.content.substring(0, 150) }}...
        <br />
        <button v-on:click="showPost(index)">
          SHOW
        </button>
        <button v-on:click="editPost(index)">
          EDIT
        </button>
        <button v-on:click="removePost(index)">
          REMOVE
        </button>
      </li>
      <hr />
    </ul>
  </div>
</template>

<script>
export default {
  name: "Start",
  data() {
    return {
      title: "",
      textField: "",
      posts: this.$store.state.posts
    };
  },
  methods: {
    addPost() {
      if (this.valid()) {
        this.$store.commit("addPost", {
          title: this.title,
          content: this.textField
        });
        this.title = "";
        this.textField = "";
      }
    },
    showPost(index) {
      this.$router.push({
        name: "Show",
        params: { index: index }
      });
    },
    editPost(index) {
      this.$router.push({
        name: "Edit",
        params: { index: index }
      });
    },
    removePost(index) {
      this.$store.commit("removePost", index);
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