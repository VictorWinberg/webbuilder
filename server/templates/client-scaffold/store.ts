export default {
  <%component%>: {
    namespaced: true,
    state: {
      list: []
    },
    mutations: {
      set<%Components%>: (state: any, list: []) => {
        state.list = list;
      }
    },
    actions: {
      async refresh({ commit }: any) {
        const res = await fetch("/api/<%components%>");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Components%>", await res.json());
      }
    }
  }
};
