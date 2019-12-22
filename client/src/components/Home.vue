<template>
  <div class="home">
    <h1>Webbuilder™</h1>
    <h3>Routes</h3>
    <ul>
      <li v-for="route in routes" v-bind:key="route">
        <router-link :to="route">{{route}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    routes() {
      const req = require.context("../app", true, /routes\.js$/);
      return req
        .keys()
        .flatMap(filename => req(filename).default)
        .map(c => c.path);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
