<template>
  <div>
    {{#fields}}
    <label for="{{name}}">{{Name}}</label>
    {{#switch type}}
    {{#case 'string'}}
    <input
      id="{{name}}"
      v-model="{{@root.entity}}.{{name}}"
      type="text"
    />
    {{/case}}
    {{#case 'text'}}
    <textarea id="{{name}}" v-model="{{@root.entity}}.{{name}}" />
    {{/case}}
    {{#case 'boolean'}}
    <input
      id="{{name}}"
      v-model="{{@root.entity}}.{{name}}"
      type="checkbox"
    />
    {{/case}}
    {{#default ''}}
    <span class="error">Missing type: {{type}}</span>
    {{/default}}
    {{/switch}}
    <br />
    {{/fields}}
    <button @click="add{{Entity}}()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { bus } from "@/main";

export default Vue.extend({
  name: "{{Entity}}New",
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

<style scoped lang="scss">
.error {
  color: red;
}
</style>
