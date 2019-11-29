export default {
  comment: {
    namespaced: true,
    state: {
      list: []
    },
    mutations: {
      setComments: (state, list) => {
        state.list = list;
      }
    },
    actions: {
      async refresh({ commit }) {
        const response = await fetch("/api/comments");
        if (response.ok) {
          commit("setComments", await response.json());
        } else {
          console.error(response);
        }
      }
    }
  }
};
