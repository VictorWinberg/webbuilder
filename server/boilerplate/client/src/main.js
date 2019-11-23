import Vue from "vue";
import AsyncComputed from "vue-async-computed";

import App from "./App.vue";
import Router from "./router";
import Store from "./store";

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

new Vue({
  render: h => h(App),
  router: Router,
  store: Store
}).$mount("#app");
