<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: "App"
};
</script>

<style lang="scss">
html {
  background-color: aliceblue !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
