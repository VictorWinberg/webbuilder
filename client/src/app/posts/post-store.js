export default {
  post: {
    namespaced: true,
    state: {
      list: []
    },
    mutations: {
      setPosts: (state, list) => {
        state.list = list;
      }
    },
    actions: {
      async refresh({ commit }) {
        const posts = await fetch("/api/posts");
        commit("setPosts", await posts.json());
      }
    }
  }
};
