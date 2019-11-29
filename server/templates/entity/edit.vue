<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="<%name%>.title" />
    <br />
    <textarea v-model="<%name%>.content" />
    <br />
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="show<%Name%>(id)">SHOW</button>
    <button v-on:click="edit<%Name%>(id)">SAVE</button>
  </div>
</template>

<script>
export default {
  name: "<%name%>-edit",
  props: {
    id: { required: true }
  },
  data() {
    return {
      <%name%>: {}
    };
  },
  created() {
    this.fetch<%Name%>();
  },
  methods: {
    async fetch<%Name%>() {
      const res = await fetch(`/api/<%names%>/${this.id}`);
      this.<%name%> = await res.json();
    },
    async edit<%Name%>(id) {
      if (this.valid()) {
        const res = await fetch(`/api/<%names%>/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: this.<%name%>.title,
            content: this.<%name%>.content
          })
        });
        if (res.err) {
          console.error(res.err);
          return;
        }
        this.back();
      }
    },
    valid() {
      return this.title !== "" && this.content !== "";
    },
    show<%Name%>(id) {
      this.$router.push({
        name: "<%name%>-show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "<%name%>-list" });
    }
  }
};
</script>

<style scoped></style>
