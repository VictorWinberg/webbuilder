<template>
  <div>
    <h1>{{ entity.title }}</h1>
    <p>{{ entity.content }}</p>
    <button @click="back()">GO BACK</button>
    <button @click="editEntity(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntityShow",
  props: {
    id: { type: String, required: true }
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
      await this.$store.dispatch("entity/read", this.id);
      this.loading = false;
    },
    editEntity(id: string) {
      this.$router.push({
        name: "entity-edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "entity-list" });
    }
  }
});
</script>

<style scoped lang="scss"></style>
