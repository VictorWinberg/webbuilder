<template>
  <div>
    <{{Entity}}New></{{Entity}}New>
    <{{Entity}}ListTable></{{Entity}}ListTable>
  </div>
</template>

<script lang="ts">
import {{Entity}}New from "./{{entity}}-new.vue";
import {{Entity}}ListTable from "./{{entity}}-list-table.vue";

export default {
  name: "{{Entity}}List",
  components: {
    {{Entity}}New,
    {{Entity}}ListTable
  }
};
</script>

<style scoped lang="scss"></style>
