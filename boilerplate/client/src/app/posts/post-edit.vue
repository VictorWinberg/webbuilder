<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="post.title" />
    <br />
    <textarea v-model="post.content" />
    <br />
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="editPost(index)">SPARA</button>
  </div>
</template>

<script>
export default {
  name: "post-edit",
  props: {
    index: { required: true }
  },
  asyncComputed: {
    post: {
      async get() {
        const res = await fetch(`/api/posts/${this.index}`);
        const json = await res.json();
        return json;
      },
      default: {}
    }
  },
  methods: {
    async editPost(index) {
      if (this.valid()) {
        const res = await fetch(`/api/posts/${index}`, {
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
    back() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>