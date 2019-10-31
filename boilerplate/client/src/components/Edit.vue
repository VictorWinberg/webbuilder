<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="content" />
    <br />
    <button v-on:click="back()">
      GO BACK
    </button>
    <button v-on:click="editPost(index)">
      SPARA
    </button>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: {
    index: { required: true }
  },
  data() {
    return {
      title: this.$store.state.posts[this.index].title,
      content: this.$store.state.posts[this.index].content
    };
  },
  methods: {
    editPost(index) {
      if (this.valid()) {
        this.$store.commit("editPost", {
          index: index,
          post: {
            title: this.title,
            content: this.content
          }
        });
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