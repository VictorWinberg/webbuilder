<template>
  <div>
    {{#fields}}
    <label for="{{name}}">{{ Name }}</label>
    {{#switch type}}
    {{#case 'string'}}
    <input id="{{name}}" v-model="{{@root.entity}}.{{name}}" type="text" />
    {{/case}}
    {{#case 'text'}}
    <textarea id="{{name}}" v-model="{{@root.entity}}.{{name}}" />
    {{/case}}
    {{#case 'boolean'}}
    <input id="{{name}}" v-model="{{@root.entity}}.{{name}}" type="checkbox" />
    {{/case}}
    {{#case 'belongsTo'}}
    <entity-selector
      v-model="{{@root.entity}}.{{Name}}Id"
      entity="{{name}}"
      option-name="{{default relation.name 'id'}}"
    ></entity-selector>
    {{/case}}
    {{#otherwise ''}}
    <span class="error">Missing type: {{ type }}</span>
    {{/otherwise}}
    {{/switch}}
    <br />
    {{/fields}}
    <button @click="add{{Entity}}()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";
{{#contains (pluck fields 'type') 'belongsTo'}}
import EntitySelector from "@/components/EntitySelector.vue";
{{/contains}}

export default Vue.extend({
  name: "{{Entity}}NewForm",
  components: {
    {{#contains (pluck fields 'type') 'belongsTo'}}
    EntitySelector
    {{/contains}}
  },
  data() {
    return {
      {{entity}}: {}
    };
  },
  methods: {
    async add{{Entity}}() {
      if (this.valid()) {
        await this.$store.dispatch("{{entity}}/create", this.{{entity}});

        this.{{entity}} = {};
        bus.$emit("refresh");
      }
    },
    valid(): boolean {
      return true;
    }
  }
});
</script>

<style lang="scss">
.error {
  color: red;
}
</style>
