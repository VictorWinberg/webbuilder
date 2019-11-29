import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const req = require.context("./app", true, /routes\.js$/);
const routes = req.keys().flatMap(filename => req(filename).default);

const defaultRoutes = [
  // {
  //   path: "/",
  //   redirect: "/somewhere"
  // },
  // {
  //   path: '*',
  //   name: 'page-not-found',
  //   component: PageNotFound
  // }
];

export default new VueRouter({
  mode: "history",
  routes: [...routes, ...defaultRoutes]
});
