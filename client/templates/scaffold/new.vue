<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="title" />
    <br />
    <textarea v-model="content" />
    <br />
    <button v-on:click="add{{Entity}}()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "{{entity}}-new",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    async add{{Entity}}() {
      if (this.valid()) {
        await this.$store.dispatch("{{entity}}/create", {
          title: this.title,
          content: this.content
        });

        this.title = "";
        this.content = "";
        await this.$store.dispatch("{{entity}}/list");
      }
    },
    valid(): boolean {
      return this.title !== "" && this.content !== "";
    }
  }
});
</script>

<style scoped lang="scss"></style>
