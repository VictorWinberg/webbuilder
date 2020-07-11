<template>
  <ul v-if="!loading">
    <li v-for="{{entity}} in {{entities}}" :key="{{entity}}.id">
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
      {{ Name }}: \{{
      {{#if relation.name}}
      $_.get("{{ Name }}.{{default relation.name 'id'}}", {{@root.entity}})
      {{else}}
      {{@root.entity}}.{{ Name }}Id
      {{/if}}
      }}
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
import { bus } from "@/main";

export default Vue.extend({
  name: "{{Entity}}ListTable",
  data() {
    return {
      {{entities}}: [],
      loading: true
    };
  },
  created() {
    this.refresh{{Entities}}();
    bus.$on("refresh", () => this.refresh{{Entities}}());
  },
  methods: {
    async refresh{{Entities}}() {
      this.loading = true;
      this.{{entities}} = await this.$store.dispatch("{{entity}}/list");
      this.loading = false;
    },
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
      this.loading = true;
      await this.$store.dispatch("{{entity}}/remove", [id]);
      await this.refresh{{Entities}}();
      this.loading = false;
    }
  }
});
</script>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;
}
.error {
  color: red;
}
</style>
