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
      {{Entity}}: {}
    };
  },
  methods: {
    async add{{Entity}}() {
      if (this.valid()) {
        await this.$store.dispatch("{{entity}}/create", this.{{Entity}});

        this.{{Entity}} = {};
        bus.$emit("refetch");
      }
    },
    valid(): boolean {
      return true;
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
