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

<script>
export default {
  name: "<%component%>-edit",
  props: {
    id: { required: true }
  },
  data() {
    return {
      <%component%>: {}
    };
  },
  created() {
    this.fetch<%Component%>();
  },
  methods: {
    async fetch<%Component%>() {
      const res = await fetch(`/api/<%components%>/${this.id}`);
      this.<%component%> = await res.json();
    },
    async edit<%Component%>(id) {
      if (this.valid()) {
        const res = await fetch(`/api/<%components%>/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.<%component%>.title,
            content: this.<%component%>.content
          })
        });
        if (res.err) {
          throw new Error(res.err);
        }
        this.back();
      }
    },
    valid() {
      return this.title !== "" && this.content !== "";
    },
    show<%Component%>(id) {
      this.$router.push({
        name: "<%component%>-show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%component%>-list" });
    }
  }
};
</script>

<style scoped></style>
