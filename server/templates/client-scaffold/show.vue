<template>
  <div>
    <h1>{{ <%component%>.title }}</h1>
    <p>{{ <%component%>.content }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="edit<%Component%>(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "<%component%>-show",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      loading: false,
      <%component%>: []
    };
  },
  methods: {
    async fetch<%Component%>() {
      this.loading = true;
      this.<%component%> = await this.$store.dispatch("<%component%>/read", this.id);
      this.loading = false;
    },
    edit<%Component%>(id: string) {
      this.$router.push({
        name: "<%component%>-edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%component%>-list" });
    }
  },
  created() {
    this.fetchProduct();
  }
});
</script>

<style scoped lang="scss"></style>
