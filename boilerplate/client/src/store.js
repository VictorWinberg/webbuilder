import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    name: "Joanna Doe"
  },
  mutations: {
    addPost(state, newPost) {
      state.posts.push(newPost);
    },
    editPost(state, data) {
      state.posts[data.index] = data.post;
    },
    removePost(state, index) {
      state.posts.splice(index, 1);
    },
    setName(state, newName) {
      state.name = newName;
    }
  }
});
