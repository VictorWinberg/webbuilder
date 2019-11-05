import Vue from "vue";
import AsyncComputed from "vue-async-computed";

import App from "./App.vue";
import Routes from "./routes";
import Store from "./store";

Vue.config.productionTip = false;

Vue.use(AsyncComputed);

new Vue({
  render: h => h(App),
  router: Routes,
  store: Store
}).$mount("#app");
