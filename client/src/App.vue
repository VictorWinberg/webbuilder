<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: { NavBar }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aliceblue;
}

textarea {
  resize: none;
  width: 340px;
  height: 100px;
}

input {
  width: 300px;
}
</style>
