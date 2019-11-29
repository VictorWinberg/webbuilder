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
        const response = await fetch("/api/<%components%>");
        if (response.ok) {
          commit("set<%Components%>", await response.json());
        } else {
          console.error(response);
        }
      }
    }
  }
};
