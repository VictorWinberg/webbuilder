<template>
  <div>
    <span>Title</span>
    <input type="text" v-model="{{entity}}.title" />
    <br />
    <textarea v-model="{{entity}}.content" />
    <br />
    <button v-on:click="back()">GO BACK</button>
    <button v-on:click="show{{Entity}}(id)">SHOW</button>
    <button v-on:click="edit{{Entity}}(id)">SAVE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "{{entity}}-edit",
  props: {
    id: { required: true }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    {{entity}}() {
      return this.$store.state.{{entity}}.current;
    }
  },
  methods: {
    async refresh{{Entity}}() {
      this.loading = true;
      await this.$store.dispatch("{{entity}}/read", this.id);
      this.loading = false;
    },
    async edit{{Entity}}(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("{{entity}}/update", {
          id,
          title: this.{{entity}}.title,
          content: this.{{entity}}.content
        });

        this.back();
      }
    },
    valid(): boolean {
      return this.{{entity}}.title !== "" && this.{{entity}}.content !== "";
    },
    show{{Entity}}(id: string) {
      this.$router.push({
        name: "{{entity}}-show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "{{entity}}-list" });
    }
  },
  created() {
    this.refresh{{Entity}}();
  }
});
</script>

<style scoped lang="scss"></style>
