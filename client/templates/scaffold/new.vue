<template>
  <div>
    {{#fields}}
    <label for="{{name}}">{{Name}}</label>
    {{#switch type}}
    {{#case 'string'}}
    <input type="text" v-model="{{name}}" />
    {{/case}}
    {{#case 'text'}}
    <textarea v-model="{{name}}" />
    {{/case}}
    {{#case 'boolean'}}
    <input type="checkbox" name="{{name}}" />
    {{/case}}
    {{#default ''}}
    <span class="error">Missing type: {{type}}</span>
    {{/default}}
    {{/switch}}
    <br />
    {{/fields}}
    <button v-on:click="add{{Entity}}()">CREATE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "{{entity}}-new",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    async add{{Entity}}() {
      if (this.valid()) {
        await this.$store.dispatch("{{entity}}/create", {
          title: this.title,
          content: this.content
        });

        this.title = "";
        this.content = "";
        await this.$store.dispatch("{{entity}}/list");
      }
    },
    valid(): boolean {
      return this.title !== "" && this.content !== "";
    }
  }
});
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
