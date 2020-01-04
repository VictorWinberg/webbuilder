<template>
    <div id="app">
        <nav-bar class="nav" />
        <section>
            <router-view />
        </section>
    </div>
</template>

<script lang="ts">
import NavBar from "@/components/Navbar.vue";

export default {
    name: "App",
    components: { NavBar },
    methods: {
        handleResize() {
            this.$store.commit("setWidth", window.innerWidth);
        }
    },
    mounted() {
        window.addEventListener("resize", this.handleResize);
        this.handleResize();
    },
    beforeDestroy: function() {
        window.removeEventListener("resize", this.handleResize);
    }
};
</script>

<style lang="scss">
html {
    background-color: aliceblue !important;
}
html,
body,
#app {
    height: 100%;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
}

section {
    overflow-y: scroll;
    width: 100%;
    padding: 1rem;
}

textarea {
    resize: none;
    width: 340px;
    height: 100px;
}
.nav {
    position: relative;
    width: 300px;
    margin: 0 !important;
    height: 100%;
}

input {
    width: 300px;
}

@media (max-width: 600px) {
    .nav {
        position: absolute !important;
    }
}
</style>
