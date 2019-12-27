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

export default Vue.extend({
  name: "<%component%>-edit",
  props: {
    id: { required: true }
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
    this.refresh<%Component%>();
  }
});
</script>

<style scoped lang="scss"></style>
