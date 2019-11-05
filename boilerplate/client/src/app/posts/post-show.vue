<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="editPost(index)">EDIT</button>
  </div>
</template>

<script>
export default {
  name: "post-show",
  props: {
    index: { required: true }
  },
  asyncComputed: {
    post: {
      async get() {
        const res = await fetch(`/api/posts/${this.index}`);
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
    editPost(index) {
      this.$router.push({
        name: "post-edit",
        params: { index }
      });
    },
    back() {
      this.$router.push("/posts");
    }
  }
};
</script>

<style scoped>
</style>