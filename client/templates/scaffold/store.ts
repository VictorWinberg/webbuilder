export default {
  <%entity%>: {
    namespaced: true,
    state: {
      current: {},
      all: []
    },
    mutations: {
      set<%Entity%>: (state: any, current: any) => {
        state.current = current;
      },
      set<%Entities%>: (state: any, all: []) => {
        state.all = all;
      }
    },
    actions: {
      async create(_: any, payload: any) {
        const res = await fetch("/api/<%entities%>>", {
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
        const res = await fetch("/api/<%entities%>");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Entities%>", await res.json());
      },
      async read({ commit }: any, id: string) {
        const res = await fetch(`/api/<%entities%>/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Entity%>", await res.json());
      },
      async update({ commit }: any, { id = null, ...payload }) {
        const res = await fetch(`/api/<%entities%>/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        commit("set<%Entity%>", await res.json());
      },
      async remove({ commit }: any, id: string) {
        const res = await fetch(`/api/<%entities%>/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      }
    }
  }
};



