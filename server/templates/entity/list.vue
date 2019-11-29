<template>
  <div>
    <<%component%>-new></<%component%>-new>
    <<%component%>-list-table></<%component%>-list-table>
  </div>
</template>

<script>
import <%Component%>New from "./<%component%>-new";
import <%Component%>ListTable from "./<%component%>-list-table";

export default {
  name: "<%component%>-list",
  components: {
    <%Component%>New,
    <%Component%>ListTable
  }
};
</script>

<style scoped></style>
