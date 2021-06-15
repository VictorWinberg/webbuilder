<template>
  <div class="home">
    <h3>Welcome to Your Webpage</h3>
    <p>
      For a guidance and help on how to customize this project <br />
      check out the documentation, <u>to be defined</u>.
    </p>
    <br />
    <b-button size="is-small" type="is-danger" @click="alterDb">
      Alter DB
    </b-button>
    <br />
    <br />
    <b-button size="is-small" type="is-danger" @click="build">
      Build
    </b-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  methods: {
    async alterDb() {
      const res = await fetch("/api/sync");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    },
    async build() {
      const res = await fetch("/api/build");
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    },
  }
});
</script>

<style lang="scss"></style>
