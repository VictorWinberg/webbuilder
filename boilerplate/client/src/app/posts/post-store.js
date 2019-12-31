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
        const response = await fetch("/api/posts");
        if (response.ok) {
          commit("setPosts", await response.json());
        } else {
          console.error(response);
        }
      }
    }
  }
};
