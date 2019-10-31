<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
    <button v-on:click="back()">
      GO BACK
    </button>
  </div>
</template>

<script>
export default {
  name: "Show",
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
    back() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>