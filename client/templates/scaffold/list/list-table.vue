<template>
  <ul>
    <li v-for="{{entity}} in {{Entities}}" :key="{{entity}}.id">
      <hr />
      {{#fields}}
      {{#switch type}}
      {{#case 'string'}}
      <b>\{{ {{@root.entity}}.{{ name }} }}</b>
      {{/case}}
      {{#case 'text'}}
      \{{ {{@root.entity}}.{{ name }} }}
      {{/case}}
      {{#case 'boolean'}}
      {{ Name }}: \{{ {{@root.entity}}.{{ name }} ? "True" : "False" }}
      {{/case}}
      {{#case 'belongsTo'}}
      {{ Name }}: \{{ {{@root.entity}}.{{ Name }}Id }}
      {{/case}}
      {{#otherwise ''}}
      <span class="error">Missing type: {{ type }}</span>
      {{/otherwise}}
      {{/switch}}
      <br />
      {{/fields}}
      <button @click="show{{Entity}}({{entity}}.id)">SHOW</button>
      <button @click="edit{{Entity}}({{entity}}.id)">EDIT</button>
      <button @click="remove{{Entity}}({{entity}}.id)">REMOVE</button>
    </li>
    <hr />
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { bus } from "@/main";

export default Vue.extend({
  name: "{{Entity}}ListTable",
  data() {
    return {
      {{Entities}}: [],
    };
  },
  created() {
    this.listener();
    bus.$on("refetch", this.listener);
  },
  beforeDestroy() {
    bus.$off("refetch", this.listener);
  },
  methods: {
    show{{Entity}}(id: string) {
      this.$router.push({
        name: "{{Entity}}Show",
        params: { id }
      });
    },
    edit{{Entity}}(id: string) {
      this.$router.push({
        name: "{{Entity}}Edit",
        params: { id }
      });
    },
    async remove{{Entity}}(id: string) {
      await this.$store.dispatch("{{entity}}/remove", [id]);
      bus.$emit("refetch");
    },
    listener() {
      this.$apollo.queries.{{Entities}}.refetch();
    }
  },
  apollo: {
    {{Entities}}: gql`
      query run {
        {{Entities}} {
          id
          {{#fields}}
          {{#unless relation.entity}}
          {{name}}
          {{/unless}}
          {{/fields}}
        }
      }
    `
  },
});
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
}
.error {
  color: red;
}
</style>
