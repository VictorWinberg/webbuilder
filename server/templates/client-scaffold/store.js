export default {
  <%component%>: {
    namespaced: true,
    state: {
      list: []
    },
    mutations: {
      set<%Components%>: (state, list) => {
        state.list = list;
      }
    },
    actions: {
      async refresh({ commit }) {
        const res = await fetch("/api/<%components%>");
        if (res.err) {
          throw new Error(res.err);
        }
        commit("set<%Components%>", await response.json());
      }
    }
  }
};
