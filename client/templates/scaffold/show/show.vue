<template>
  <div>
    <{{entity}}-show-form :id="id"></{{entity}}-show-form>
    <button @click="back()">GO BACK</button>
    <button @click="edit{{Entity}}(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {{Entity}}ShowForm from "@/app/{{entity}}/show/{{entity}}-show-form.vue";

export default Vue.extend({
  name: "{{Entity}}Show",
  components: {
    {{Entity}}ShowForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    edit{{Entity}}(id: string) {
      this.$router.push({
        name: "{{Entity}}Edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "{{Entity}}List" });
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
