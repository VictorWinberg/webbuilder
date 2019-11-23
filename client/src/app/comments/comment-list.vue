<template>
  <div>
    <comment-new></comment-new>
    <comment-list-table></comment-list-table>
  </div>
</template>

<script>
import CommentNew from "./comment-new";
import CommentListTable from "./comment-list-table";

export default {
  name: "comment-list",
  components: {
    CommentNew,
    CommentListTable
  }
};
</script>

<style scoped>
</style>