<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="content" />
    <br />
    <button v-on:click="addPost()">CREATE</button>
  </div>
</template>

<script>
export default {
  name: "post-new",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
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
        await this.$store.dispatch("post/refresh");
      }
    },
    valid() {
      return this.title !== "" && this.content !== "";
    }
  }
};
</script>

<style></style>
