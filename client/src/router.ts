import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/components/Home.vue";
import NotFound from "@/components/NotFound.vue";
import EntityRoutes from "@/components/entity/entity-routes";

Vue.use(VueRouter);

const req = require.context("./app", true, /routes\.ts$/);
const routes = req.keys().flatMap((filename): [] => req(filename).default);

const defaultRoutes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    meta: { name: "Home", static: true, icon: "home" },
    component: Home
  },
  ...EntityRoutes,
  {
    path: "*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...routes, ...defaultRoutes]
});

export default router;
