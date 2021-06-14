<template>
  <div>
    <h1>{{ entity.title }}</h1>
    <p>{{ entity.content }}</p>
    <button @click="back()">GO BACK</button>
    <button @click="editEntity(name)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntityShow",
  props: {
    name: { type: String, required: true }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    entity() {
      return this.$store.state.entity.current;
    }
  },
  created() {
    this.refreshEntity();
  },
  methods: {
    async refreshEntity() {
      this.loading = true;
      await this.$store.dispatch("entity/read", this.name);
      this.loading = false;
    },
    editEntity(name: string) {
      this.$router.push({
        name: "EntityEdit",
        params: { name }
      });
    },
    back() {
      this.$router.push({ name: "EntityList" });
    }
  }
});
</script>

<style lang="scss"></style>
