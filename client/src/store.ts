import Vue from "vue";
import Vuex from "vuex";
import { mergeAll } from "lodash/fp";

import entityStore from "@/components/entity/entity-store";

Vue.use(Vuex);

const req = require.context("./app", true, /store\.ts$/);
const stores = req.keys().flatMap((filename): {} => req(filename).default);
stores.push(entityStore);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: mergeAll(stores)
});
