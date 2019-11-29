export default {
  <%name%>: {
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
        const response = await fetch("/api/<%names%>");
        if (response.ok) {
          commit("set<%Names%>", await response.json());
        } else {
          console.error(response);
        }
      }
    }
  }
};
