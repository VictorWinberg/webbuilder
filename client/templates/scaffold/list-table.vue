<template>
  <ul>
    <li v-for="{{entity}} in {{entities}}" v-bind:key="{{entity}}.id">
      <hr />
      <b>\{{ {{entity}}.title }}</b>
      <br />
      \{{ {{entity}}.content }}
      <br />
      <button v-on:click="show{{Entity}}({{entity}}.id)">SHOW</button>
      <button v-on:click="edit{{Entity}}({{entity}}.id)">EDIT</button>
      <button v-on:click="remove{{Entity}}({{entity}}.id)">REMOVE</button>
    </li>
    <hr />
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "{{entity}}-list-table",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    {{entities}}() {
      return this.$store.state.{{entity}}.all;
    }
  },
  methods: {
    async refresh{{Entities}}() {
      this.loading = true;
      await this.$store.dispatch("{{entity}}/list");
      this.loading = false;
    },
    show{{Entity}}(id: string) {
      this.$router.push({
        name: "{{entity}}-show",
        params: { id }
      });
    },
    edit{{Entity}}(id: string) {
      this.$router.push({
        name: "{{entity}}-edit",
        params: { id }
      });
    },
    async remove{{Entity}}(id: string) {
      this.loading = true;
      await this.$store.dispatch("{{entity}}/remove", id);
      await this.refresh{{Entities}}();
      this.loading = false;
    }
  },
  created() {
    this.refresh{{Entities}}();
  }
});
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
}
</style>