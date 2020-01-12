<template>
  <div>
    {{#fields}}
    <label for="{{name}}">{{ Name }}</label>
    {{#switch type}}
    {{#case 'string'}}
    <input id="{{name}}" v-model="{{@root.Entity}}.{{name}}" type="text" />
    {{/case}}
    {{#case 'text'}}
    <textarea id="{{name}}" v-model="{{@root.Entity}}.{{name}}" />
    {{/case}}
    {{#case 'boolean'}}
    <input id="{{name}}" v-model="{{@root.Entity}}.{{name}}" type="checkbox" />
    {{/case}}
    {{#case 'belongsTo'}}
    <entity-selector
      v-model="{{@root.Entity}}.{{Name}}Id"
      entity="{{name}}"
    ></entity-selector>
    {{/case}}
    {{#otherwise ''}}
    <span class="error">Missing type: {{ type }}</span>
    {{/otherwise}}
    {{/switch}}
    <br />
    {{/fields}}
    <button @click="edit{{Entity}}(id)">SAVE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import gql from "graphql-tag";
import { bus } from "@/main";
{{#contains (pluck fields 'type') 'belongsTo'}}
import EntitySelector from "@/components/EntitySelector.vue";
{{/contains}}

export default Vue.extend({
  name: "{{Entity}}EditForm",
  components: {
    {{#contains (pluck fields 'type') 'belongsTo'}}
    EntitySelector
    {{/contains}}
  },
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      {{Entity}}: {},
    };
  },
  methods: {
    async edit{{Entity}}(id: string) {
      if (this.valid()) {
        await this.$store.dispatch("{{entity}}/update", [id, this.{{Entity}}]);
        bus.$emit("refetch");
      }
    },
    valid(): boolean {
      return true;
    }
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
      variables(): {} {
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
