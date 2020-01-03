<template>
  <div>
    <{{entity}}-edit-form :id="id"></{{entity}}-edit-form>
    <button @click="back()">GO BACK</button>
    <button @click="show{{Entity}}(id)">SHOW</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {{Entity}}EditForm from "@/app/{{entity}}/edit/{{entity}}-edit-form.vue";

export default Vue.extend({
  name: "{{Entity}}Edit",
  components: {
    {{Entity}}EditForm
  },
  props: {
    id: { type: String, required: true }
  },
  methods: {
    show{{Entity}}(id: string) {
      this.$router.push({
        name: "{{Entity}}Show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "{{Entity}}List" });
    }
  }
});
</script>

<style scoped lang="scss"></style>
