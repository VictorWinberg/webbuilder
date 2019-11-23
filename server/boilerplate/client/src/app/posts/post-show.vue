<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="editPost(id)">EDIT</button>
  </div>
</template>

<script>
export default {
  name: "post-show",
  props: {
    id: { required: true }
  },
  asyncComputed: {
    post: {
      async get() {
        const res = await fetch(`/api/posts/${this.id}`);
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
    editPost(id) {
      this.$router.push({
        name: "post-edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "post-list" });
    }
  }
};
</script>

<style scoped>
</style>