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
    <button @:click="back()">GO BACK</button>
    <button @:click="show{{Entity}}(id)">SHOW</button>
    <button @:click="edit{{Entity}}(id)">SAVE</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "{{Entity}}Edit",
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
    async edit{{Entity}}(id: string) {
      if (this.valid()) {
        this.{{entity}} = await this.$store.dispatch("{{entity}}/update", [id, this.{{entity}}]);

        // TODO: Some check?
        this.back();
      }
    },
    valid(): boolean {
      return true;
    },
    show{{Entity}}(id: string) {
      this.$router.push({
        name: "{{Entity}}Show",
        params: { id }
      });
    },
    back() {
      this.$router.push({ name: "{{Entity}}List" });
    }
  }
});
</script>

<style scoped lang="scss"></style>
