import Vue from "vue";
import VueRouter from "vue-router";
import Start from "./components/Start";
import Show from "./components/Show";
import Edit from "./components/Edit";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { name: "Start", path: "/", component: Start },
    {
      name: "Show",
      path: "/show/:index",
      component: Show,
      props: true
    },
    {
      name: "Edit",
      path: "/edit/:index",
      component: Edit,
      props: true
    }
  ]
});
