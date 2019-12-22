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

<script>
export default {
  name: "<%component%>-list-table",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.refresh<%Components%>();
  },
  computed: {
    <%components%>() {
      return this.$store.state.<%component%>.list;
    }
  },
  methods: {
    async refresh<%Components%>() {
      this.loading = true;
      await this.$store.dispatch("<%component%>/refresh");
      this.loading = false;
    },
    show<%Component%>(id) {
      this.$router.push({
        name: "<%component%>-show",
        params: { id }
      });
    },
    edit<%Component%>(id) {
      this.$router.push({
        name: "<%component%>-edit",
        params: { id }
      });
    },
    async remove<%Component%>(id) {
      const res = await fetch(`/api/<%components%>/${id}`, {
        method: "DELETE"
      });
      if (res.err) {
        throw new Error(res.err);
      }
      await this.refresh<%Components%>();
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>