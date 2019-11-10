import Vue from "vue";
import Vuex from "vuex";
import { mergeAll } from "lodash/fp";

Vue.use(Vuex);

const req = require.context("./app", true, /store\.js$/);
const stores = req.keys().flatMap(filename => req(filename).default);

export default new Vuex.Store(mergeAll(stores));
