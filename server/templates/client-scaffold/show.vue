<template>
  <div>
    <h1>{{ <%component%>.title }}</h1>
    <p>{{ <%component%>.content }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="edit<%Component%>(id)">EDIT</button>
  </div>
</template>

<script>
export default {
  name: "<%component%>-show",
  props: {
    id: { required: true }
  },
  asyncComputed: {
    <%component%>: {
      async get() {
        const res = await fetch(`/api/<%components%>/${this.id}`);
        if (res.err) {
          throw new Error(res.err);
        }
        const json = await res.json();
        return json;
      },
      default: {}
    }
  },
  methods: {
    edit<%Component%>(id) {
      this.$router.push({
        name: "<%component%>-edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%component%>-list" });
    }
  }
};
</script>

<style scoped>
</style>