<template>
  <div>
    <post-new></post-new>
    <post-list-table></post-list-table>
  </div>
</template>

<script>
import PostNew from "./post-new";
import PostListTable from "./post-list-table";

export default {
  name: "post-list",
  components: {
    PostNew,
    PostListTable
  }
};
</script>

<style scoped>
</style>