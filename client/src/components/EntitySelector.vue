<template>
  <select v-model="localValue">
    <option v-for="option in entities" :key="option.id" :value="option.id">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
import Vue from "vue";
import { bus } from "@/main";

export default Vue.extend({
  name: "EntitySelector",
  props: {
    value: { type: String, required: true, default: "" },
    entity: { type: String, required: true }
  },
  data() {
    return {
      entities: []
    };
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(localValue) {
        this.$emit("input", localValue);
      }
    }
  },
  created() {
    this.refreshEntities();
    bus.$on("refresh", () => this.refreshEntities());
  },
  methods: {
    async refreshEntities() {
      this.loading = true;
      this.entities = await this.$store.dispatch(`${this.entity}/list`);
      this.loading = false;
    }
  }
});
</script>

<style></style>
