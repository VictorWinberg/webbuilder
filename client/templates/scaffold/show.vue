<template>
  <div>
    <h1>{{ <%entity%>.title }}</h1>
    <p>{{ <%entity%>.content }}</p>
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="edit<%Entity%>(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "<%entity%>-show",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    <%entity%>() {
      return this.$store.state.<%entity%>.current;
    }
  },
  methods: {
    async refresh<%Entity%>() {
      this.loading = true;
      await this.$store.dispatch("<%entity%>/read", this.id);
      this.loading = false;
    },
    edit<%Entity%>(id: string) {
      this.$router.push({
        name: "<%entity%>-edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%entity%>-list" });
    }
  },
  created() {
    this.refresh<%Entity%>();
  }
});
</script>

<style scoped lang="scss"></style>
