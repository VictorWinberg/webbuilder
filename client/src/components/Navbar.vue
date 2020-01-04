<template>
  <div>
    <b>Webbuilder</b>
    <ul>
      <li v-for="route in staticRoutes" :key="route.path">
        <router-link :to="route.path">{{ route.meta.name }}</router-link>
      </li>
      <li></li>
      <li v-for="route in dynamicRoutes" :key="route.path">
        <router-link :to="route.path">{{ route.meta.name }}</router-link>
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
      staticRoutes: [],
      dynamicRoutes: []
    };
  },
  created() {
    // @ts-ignore: options is private variable
    const { routes } = this.$router.options;
    this.staticRoutes = sortBy("path")(
      filter(["meta.static", true], routes)
    ) as [];
    this.dynamicRoutes = sortBy("path")(
      filter(["meta.static", false], routes)
    ) as [];
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
