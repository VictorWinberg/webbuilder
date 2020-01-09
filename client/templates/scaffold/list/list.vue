<template>
  <div>
    <{{entity}}-new></{{entity}}-new>
    <{{entity}}-list-table></{{entity}}-list-table>
  </div>
</template>

<script lang="ts">
import {{Entity}}New from "@/app/{{entity}}/new/{{entity}}-new-form.vue";
import {{Entity}}ListTable from "@/app/{{entity}}/list/{{entity}}-list-table.vue";

export default {
  name: "{{Entity}}List",
  components: {
    {{Entity}}New,
    {{Entity}}ListTable
  }
};
</script>

<style scoped lang="scss"></style>
