<template>
  <div>
    <entity-new></entity-new>
    <entity-list-table></entity-list-table>
  </div>
</template>

<script lang="ts">
import EntityNew from "./entity-new.vue";
import EntityListTable from "./entity-list-table.vue";

export default {
  name: "entity-list",
  components: {
    EntityNew,
    EntityListTable
  }
};
</script>

<style scoped lang="scss"></style>
