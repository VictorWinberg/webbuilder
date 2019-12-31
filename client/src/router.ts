import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "@/components/Home.vue";
import NotFound from "@/components/NotFound.vue";

Vue.use(VueRouter);

const req = require.context("./app", true, /routes\.ts$/);
const routes = req.keys().flatMap((filename): [] => req(filename).default);

const defaultRoutes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    meta: "Home",
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
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
