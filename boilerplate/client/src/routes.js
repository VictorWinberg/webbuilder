import Vue from "vue";
import VueRouter from "vue-router";

import postRoutes from './app/posts/post-routes';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  // {
  //   path: '*',
  //   name: 'page-not-found',
  //   component: AppPageNotFound
  // }
];

export default new VueRouter({
  mode: "history",
  routes: [...postRoutes, ...routes]
});
