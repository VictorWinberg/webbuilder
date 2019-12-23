<template>
  <ul>
    <li v-for="<%component%> in <%components%>" v-bind:key="<%component%>.id">
      <hr />
      <b>{{ <%component%>.title }}</b>
      <br />
      {{ <%component%>.content }}
      <br />
      <button v-on:click="show<%Component%>(<%component%>.id)">SHOW</button>
      <button v-on:click="edit<%Component%>(<%component%>.id)">EDIT</button>
      <button v-on:click="remove<%Component%>(<%component%>.id)">REMOVE</button>
    </li>
    <hr />
  </ul>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "<%component%>-list-table",
  data() {
    return {
      loading: false,
      <%components%>: []
    };
  },
  methods: {
    async refresh<%Components%>() {
      this.loading = true;
      this.<%components%> = await this.$store.dispatch("<%component%>/list");
      this.loading = false;
    },
    show<%Component%>(id: string) {
      this.$router.push({
        name: "<%component%>-show",
        params: { id }
      });
    },
    edit<%Component%>(id: string) {
      this.$router.push({
        name: "<%component%>-edit",
        params: { id }
      });
    },
    async remove<%Component%>(id: string) {
      const res = await fetch(`/api/<%components%>/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      await this.refresh<%Components%>();
    }
  },
  created() {
    this.refresh<%Components%>();
  }
});
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
}
</style>