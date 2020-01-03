<template>
  <div>
    {{#views.list}}
    <{{@root.entity}}-{{kebab feature}}></{{@root.entity}}-{{kebab feature}}>
    {{/views.list}}
  </div>
</template>

<script lang="ts">
{{#views.list}}
import {{@root.Entity}}{{feature}} from "@/app/{{@root.entity}}/{{module}}/{{@root.entity}}-{{kebab feature}}.vue";
{{/views.list}}

export default {
  name: "{{Entity}}List",
  components: {
    {{#views.list}}
    {{@root.Entity}}{{feature}},
    {{/views.list}}
  }
};
</script>

<style scoped lang="scss"></style>
