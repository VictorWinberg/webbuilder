<template>
    <div class="menu">
        <b-button
            class="is-pulled-left menu-toggle open"
            size="is-medium"
            icon-pack="fas"
            icon-right="bars"
            v-on:click="toggleMenu(true)"
            v-if="!menuOpen"
        >
        </b-button>
        <b-menu class="box" v-if="menuOpen || !isMobile">
            <b-button
                class="is-pulled-right menu-toggle close"
                size="is-medium"
                icon-pack="fas"
                icon-right="times"
                v-on:click="toggleMenu(false)"
            >
            </b-button>
            <b-menu-list label="Static">
                <b-menu-item
                    v-for="route in staticRoutes"
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
                    v-for="route in dynamicRoutes"
                    :key="route.path"
                    tag="router-link"
                    :label="route.meta.name"
                    :to="route.path"
                    icon-pack="fas"
                    icon="dot-circle"
                />
            </b-menu-list>
        </b-menu>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { sortBy, filter } from "lodash/fp";

export default Vue.extend({
    name: "Navbar",
    data() {
        return {
            staticRoutes: [],
            dynamicRoutes: [],
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
    },
    created() {
        // @ts-ignore: options is private variable
        const { routes } = this.$router.options;
        this.staticRoutes = sortBy("path")(
            filter(["meta.static", true], routes)
        ) as [];
        this.dynamicRoutes = sortBy("path")(
            filter(["meta.static", false], routes)
        ) as [];
    }
});
</script>

<style lang="scss">
.menu {
    text-align: left;
    height: 100%;

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
