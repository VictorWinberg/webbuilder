<template>
  <div>
    {{#fields}}
    {{#switch type}}
    {{#case 'string'}}
    <h1>\{{ {{@root.Entity}}.{{ name }} }}</h1>
    {{/case}}
    {{#case 'text'}}
    \{{ {{@root.Entity}}.{{ name }} }}
    {{/case}}
    {{#case 'boolean'}}
    \{{ {{@root.Entity}}.{{ name }} }}
    {{/case}}
    {{#case 'belongsTo'}}
    {{ Name }} \{{ {{@root.Entity}}.{{ Name }} }}
    {{/case}}
    {{#otherwise ''}}
    <span class="error">Missing type: {{ type }}</span>
    {{/otherwise}}
    {{/switch}}
    <br />
    {{/fields}}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";

export default Vue.extend({
  name: "{{Entity}}ShowForm",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      {{Entity}}: {},
    };
  },
  apollo: {
    {{Entity}}: {
      query: gql`
        query run($id: ID!) {
          {{Entity}} (id: $id) {
            id
            {{#fields}}
            {{#unless relation.entity}}
            {{name}}
            {{/unless}}
            {{/fields}}
          }
        }
      `,
      variables() {
        return {
          id: this.id
        };
      }
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
