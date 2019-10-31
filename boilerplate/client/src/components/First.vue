<template>
  <div>
    <h1>First</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <button v-on:click="back()">Back</button>
  </div>
</template>

<script>
export default {
  name: "First",
  methods: {
    back() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
