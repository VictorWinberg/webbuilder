<template>
  <div v-if="!loading">
    {{#fields}}
    {{#switch type}}
    {{#case 'string'}}
    <h1>\{{ {{@root.entity}}.{{ name }} }}</h1>
    {{/case}}
    {{#case 'text'}}
    \{{ {{@root.entity}}.{{ name }} }}
    {{/case}}
    {{#case 'boolean'}}
    \{{ {{@root.entity}}.{{ name }} }}
    {{/case}}
    {{#case 'belongsTo'}}
    {{ Name }}: \{{ {{@root.entity}}.{{ Name }}.{{default relation.name "id"}}
    }}
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

export default Vue.extend({
  name: "{{Entity}}ShowForm",
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      {{entity}}: {},
      loading: true
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
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
