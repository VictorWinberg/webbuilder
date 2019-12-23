<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="<%component%>.title" />
    <br />
    <textarea v-model="<%component%>.content" />
    <br />
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="show<%Component%>(id)">SHOW</button>
    <button v-on:click="edit<%Component%>(id)">SAVE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
type <%Component%> = {
  title: string,
  content: string
}

export default Vue.extend({
  name: "<%component%>-edit",
  props: {
    id: { required: true }
  },
  data() {
    return {
      <%component%>: {} as <%Component%>
    };
  },
  methods: {
    async fetch<%Component%>() {
      const res = await fetch(`/api/<%components%>/${this.id}`);
      this.<%component%> = await res.json();
    },
    async edit<%Component%>(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("<%component%>/update", {
          id,
          title: this.<%component%>.title,
          content: this.<%component%>.content
        });

        this.back();
      }
    },
    valid(): boolean {
      return this.<%component%>.title !== "" && this.<%component%>.content !== "";
    },
    show<%Component%>(id: string) {
      this.$router.push({
        name: "<%component%>-show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%component%>-list" });
    }
  },
  created() {
    this.fetch<%Component%>();
  }
});
</script>

<style scoped lang="scss"></style>
