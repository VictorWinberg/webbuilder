<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="post.title" />
    <br />
    <textarea v-model="post.content" />
    <br />
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="showPost(id)">SHOW</button>
    <button v-on:click="editPost(id)">SAVE</button>
  </div>
</template>

<script>
export default {
  name: "post-edit",
  props: {
    id: { required: true }
  },
  data() {
    return {
      post: {}
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const res = await fetch(`/api/posts/${this.id}`);
      this.post = await res.json();
    },
    async editPost(id) {
      if (this.valid()) {
        const res = await fetch(`/api/posts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.post.title,
            content: this.post.content
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
    showPost(id) {
      this.$router.push({
        name: "post-show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "post-list" });
    }
  }
};
</script>

<style scoped></style>
