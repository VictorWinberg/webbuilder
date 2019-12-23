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
      loading: false
    };
  },
  computed: {
    <%component%>() {
      return this.$store.state.<%component%>.current;
    }
  },
  methods: {
    async refresh<%Component%>() {
      this.loading = true;
      await this.$store.dispatch("<%component%>/read", this.id);
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
    this.refresh<%Component%>();
  }
});
</script>

<style scoped lang="scss"></style>
