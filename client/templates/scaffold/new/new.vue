<template>
  <div>
    <{{entity}}-new-form></{{entity}}-new-form>
    <button @click="back()">GO BACK</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {{Entity}}NewForm from "@/app/{{entity}}/new/{{entity}}-new-form.vue";

export default Vue.extend({
  name: "{{Entity}}New",
  components: {
    {{Entity}}NewForm
  },
  methods: {
    back() {
      this.$router.push({ name: "{{Entity}}List" });
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
