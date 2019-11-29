<template>
  <div>
    <<%name%>-new></<%name%>-new>
    <<%name%>-list-table></<%name%>-list-table>
  </div>
</template>

<script>
import <%Name%>New from "./<%name%>-new";
import <%Name%>ListTable from "./<%name%>-list-table";

export default {
  name: "<%name%>-list",
  components: {
    <%Name%>New,
    <%Name%>ListTable
  }
};
</script>

<style scoped></style>
