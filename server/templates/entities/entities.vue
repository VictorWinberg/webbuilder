<template>
  <div>{{JSON.stringify(entities)}}</div>
</template>

<script>
export default {
  name: "entities",
  data() {
    return {
      entities: <%&entities%>
    };
  }
};
</script>

<style scoped>
</style>
