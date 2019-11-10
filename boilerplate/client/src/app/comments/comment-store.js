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
        const comments = await fetch("/api/comments");
        commit("setComments", await comments.json());
      }
    }
  }
};
