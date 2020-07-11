<template>
  <div>
    <{{entity}}-new-form></{{entity}}-new-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {{Entity}}NewForm from "@/app/{{entity}}/new/{{entity}}-new-form.vue";

export default Vue.extend({
  name: "{{Entity}}New",
  components: {
    {{Entity}}NewForm
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
