export default {
  post: {
    namespaced: true,
    state: {
      list: []
    },
    mutations: {
      set<%Names%>: (state, list) => {
        state.list = list;
      }
    },
    actions: {
      async refresh({ commit }) {
        const posts = await fetch("/api/posts");
        commit("set<%Names%>", await posts.json());
      }
    }
  }
};
