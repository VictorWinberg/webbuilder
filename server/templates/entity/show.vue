<template>
  <div>
    <h1>{{ <%name%>.title }}</h1>
    <p>{{ <%name%>.content }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="edit<%Name%>(id)">EDIT</button>
  </div>
</template>

<script>
export default {
  name: "<%name%>-show",
  props: {
    id: { required: true }
  },
  asyncComputed: {
    <%name%>: {
      async get() {
        const res = await fetch(`/api/<%names%>/${this.id}`);
        if (res.err) {
          console.error(res.err);
          return;
        }
        const json = await res.json();
        return json;
      },
      default: {}
    }
  },
  methods: {
    edit<%Name%>(id) {
      this.$router.push({
        name: "<%name%>-edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%name%>-list" });
    }
  }
};
</script>

<style scoped>
</style>