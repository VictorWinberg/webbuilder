<template>
  <div>
    <b-button
      v-if="!menuOpen"
      class="is-pulled-left menu-toggle open"
      size="is-medium"
      icon-pack="fas"
      icon-right="bars"
      @click="toggleMenu(true)"
    >
    </b-button>
    <b-menu class="box" :class="menuOpen || !isMobile ? 'show' : 'hide'">
      <b-button
        class="is-pulled-right menu-toggle close"
        size="is-medium"
        icon-pack="fas"
        icon-right="times"
        @click="toggleMenu(false)"
      >
      </b-button>
      <b-menu-list label="Static">
        <b-menu-item
          v-for="route in $_.filter(['meta.static', true], routes)"
          :key="route.path"
          :label="route.meta.name"
          tag="router-link"
          :to="route.path"
          icon-pack="fas"
          :icon="route.meta.icon"
        >
        </b-menu-item>
      </b-menu-list>
      <b-menu-list label="Dynamic">
        <b-menu-item
          v-for="route in $_.filter(['meta.static', false], routes)"
          :key="route.path"
          icon-pack="fas"
          icon="dot-circle"
        >
          <template slot="label" slot-scope="props">
            {{ route.meta.name }}
            <b-icon
              class="is-pulled-right"
              :icon="props.expanded ? 'menu-down' : 'menu-up'"
            />
          </template>
          <b-menu-item
            v-for="child in $_.filter(['meta.static', false], route.children)"
            :key="child.path"
            :label="child.meta.name"
            tag="router-link"
            :to="route.path + '/' + child.path"
          />
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Navbar",
  data() {
    return {
      // @ts-ignore: options is private variable
      routes: this.$router.options.routes,
      menuOpen: false
    };
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile;
    }
  },
  methods: {
    toggleMenu(boolean: boolean) {
      this.menuOpen = boolean;
    }
  }
});
</script>

<style lang="scss">
.menu-toggle {
  &.open {
    position: absolute !important;
  }
}
.menu {
  height: 100%;

  &.show {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s ease-in;
  }
  &.hide {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }

  .menu-list {
    .icon {
      vertical-align: top;
      color: #888;
    }
  }
}

@media (min-width: 600px) {
  .menu-toggle {
    visibility: hidden;
  }
}
</style>
