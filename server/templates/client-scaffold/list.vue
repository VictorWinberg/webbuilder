<template>
  <div>
    <<%component%>-new></<%component%>-new>
    <<%component%>-list-table></<%component%>-list-table>
  </div>
</template>

<script lang="ts">
import <%Component%>New from "./<%component%>-new.vue";
import <%Component%>ListTable from "./<%component%>-list-table.vue";

export default {
  name: "<%component%>-list",
  components: {
    <%Component%>New,
    <%Component%>ListTable
  }
};
</script>

<style scoped lang="scss"></style>
