export default {
  <%component%>: {
    namespaced: true,
    state: {
      current: {},
      all: []
    },
    mutations: {
      set<%Component%>: (state: any, current: any) => {
        state.current = current;
      },
      set<%Components%>: (state: any, all: []) => {
        state.all = all;
      }
    },
    actions: {
      async create(_: any, payload: any) {
        const res = await fetch("/api/<%components%>>", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          throw new Error(res.statusText);
        }
      },
      async list({ commit }: any) {
        const res = await fetch("/api/<%components%>");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Components%>", await res.json());
      },
      async read({ commit }: any, id: string) {
        const res = await fetch(`/api/<%components%>/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Component%>", await res.json());
      },
      async update({ commit }: any, { id = null, ...payload }) {
        const res = await fetch(`/api/<%components%>/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Component%>", await res.json());
      },
      async remove({ commit }: any, id: string) {
        const res = await fetch(`/api/<%components%>/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      }
    }
  }
};



