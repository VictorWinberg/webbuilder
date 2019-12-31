<template>
  <div>
    <b>Webbuilder</b>
    <ul>
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path">{{ route.meta }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { sortBy, filter } from "lodash/fp";

export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      routes: []
    };
  },
  created() {
    // @ts-ignore: options is private variable
    this.routes = sortBy("path")(filter("meta", this.$router.options.routes));
  }
});
</script>

<style lang="scss">
ul {
  padding: 0;

  li {
    display: inline;
    padding: 4px;

    a {
      text-decoration: none;
      color: inherit;
      padding: 0.5em;
      border: 2px solid gray;
      border-radius: 4px;
    }
  }
}
</style>
