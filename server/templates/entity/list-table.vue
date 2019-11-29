<template>
  <ul>
    <li v-for="<%name%> in <%names%>" v-bind:key="<%name%>.id">
      <hr />
      <b>{{ <%name%>.title }}</b>
      <br />
      {{ <%name%>.content }}
      <br />
      <button v-on:click="show<%Name%>(<%name%>.id)">SHOW</button>
      <button v-on:click="edit<%Name%>(<%name%>.id)">EDIT</button>
      <button v-on:click="remove<%Name%>(<%name%>.id)">REMOVE</button>
    </li>
    <hr />
  </ul>
</template>

<script>
export default {
  name: "<%name%>-list-table",
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.refresh<%Names%>();
  },
  computed: {
    <%names%>() {
      return this.$store.state.<%name%>.list;
    }
  },
  methods: {
    async refresh<%Names%>() {
      this.loading = true;
      await this.$store.dispatch("<%name%>/refresh");
      this.loading = false;
    },
    show<%Name%>(id) {
      this.$router.push({
        name: "<%name%>-show",
        params: { id }
      });
    },
    edit<%Name%>(id) {
      this.$router.push({
        name: "<%name%>-edit",
        params: { id }
      });
    },
    async remove<%Name%>(id) {
      const res = await fetch(`/api/<%names%>/${id}`, {
        method: "DELETE"
      });
      if (res.err) {
        console.error(res.err);
        return;
      }
      await this.refresh<%Names%>();
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