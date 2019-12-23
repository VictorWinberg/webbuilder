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
export default {
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
        const res = await fetch("/api/<%components%>", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.title,
            content: this.content
          })
        });

        if (res.err) {
          throw new Error(res.err);
        }

        this.title = "";
        this.content = "";
        await this.$store.dispatch("<%component%>/refresh");
      }
    },
    valid() {
      return this.title !== "" && this.content !== "";
    }
  }
};
</script>

<style scoped lang="scss"></style>
