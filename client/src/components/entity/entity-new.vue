<template>
  <div class="entity-new">
    <div>
      <b-field>
        <template slot="label" class="label">TitleX</template>
        <b-input v-model="title" placeholder="Pick a title" />
      </b-field>
      <b-field>
        <template slot="label" class="label">ContentX</template>
        <b-input v-model="content" placeholder="Pick content" />
      </b-field>
      <b-button type="success" @click="addPost()">CREATE</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EntityNew",
  data() {
    return {
      title: "",
      content: ""
    };
  },
  computed: {
    entities() {
      return this.$store.state.entity.all;
    }
  },
  methods: {
    async addEntity() {
      if (this.valid()) {
        await this.$store.dispatch("entity/create", {
          title: this.title,
          content: this.content
        });

        this.title = "";
        this.content = "";
        await this.$store.dispatch("entity/list");
      }
    },
    valid(): boolean {
      return this.title !== "" && this.content !== "";
    }
  }
});
</script>

<style scoped lang="scss">
.entity-new {
  display: flex;
}
.field {
  display: flex;

  .label {
    flex: 1 !important;
    text-align: right;
    color: red;
  }
  div {
    flex: 3;
  }
}
</style>
