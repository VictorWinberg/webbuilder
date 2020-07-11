import Vue, { VNode } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/bootstrap";
import "./plugins/bueify";
import "./plugins/element-ui";

import "./registerServiceWorker";

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  router,
  store,
  render: (h): VNode => h(App)
}).$mount("#app");
