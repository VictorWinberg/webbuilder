export default {
  state: {
    comments: []
  },
  mutations: {
    setComments: (state, comments) => {
      state.comments = comments;
    }
  },
  actions: {
    async refreshComments({ commit }) {
      const comments = await fetch("/api/comments");
      commit("setComments", await comments.json());
    }
  }
};
