<template>
  <div>
    {{#fields}}
    {{#switch type}}
    {{#case 'string'}}
    <h1>\{{ {{@root.entity}}.{{name}} }}</h1>
    {{/case}}
    {{#case 'text'}}
    \{{ {{@root.entity}}.{{name}} }}
    {{/case}}
    {{#case 'boolean'}}
    \{{ {{@root.entity}}.{{name}} }}
    {{/case}}
    {{#default ''}}
    <span
      class="error"
    >Missing type: {{type}}</span>
    {{/default}}
    {{/switch}}
    <br />
    {{/fields}}
    <button @click="back()">GO BACK</button>
    <button @click="edit{{Entity}}(id)">EDIT</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "{{Entity}}Show",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      {{entity}}: {},
      loading: false
    };
  },
  created() {
    this.refresh{{Entity}}();
  },
  methods: {
    async refresh{{Entity}}() {
      this.loading = true;
      this.{{entity}} = await this.$store.dispatch("{{entity}}/read", [this.id]);
      this.loading = false;
    },
    edit{{Entity}}(id: string) {
      this.$router.push({
        name: "{{Entity}}Edit",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "{{Entity}}List" });
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
