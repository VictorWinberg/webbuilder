<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="content" />
    <br />
    <button v-on:click="add<%Component%>()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "<%component%>-new",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    async add<%Component%>() {
      if (this.valid()) {
        await this.$store.dispatch("<%component%>/create", {
          title: this.title,
          content: this.content
        });

        this.title = "";
        this.content = "";
        await this.$store.dispatch("<%component%>/list");
      }
    },
    valid(): boolean {
      return this.title !== "" && this.content !== "";
    }
  }
});
</script>

<style scoped lang="scss"></style>
