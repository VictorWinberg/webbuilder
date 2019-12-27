<template>
  <div>
    <<%entity%>-new></<%entity%>-new>
    <<%entity%>-list-table></<%entity%>-list-table>
  </div>
</template>

<script lang="ts">
import <%Entity%>New from "./<%entity%>-new.vue";
import <%Entity%>ListTable from "./<%entity%>-list-table.vue";

export default {
  name: "<%entity%>-list",
  components: {
    <%Entity%>New,
    <%Entity%>ListTable
  }
};
</script>

<style scoped lang="scss"></style>
