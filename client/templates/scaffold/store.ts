export default {
  {{entity}}: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: any, payload: any) {
        const res = await fetch("/api/{{entities}}", {
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
        const res = await fetch("/api/{{entities}}");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        return json;
      },
      async read({ commit }: any, [id]: [string]) {
        const res = await fetch(`/api/{{entities}}/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        return json;
      },
      async update({ commit }: any, [id, payload]: [string, any]) {
        const res = await fetch(`/api/{{entities}}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const json = await res.json();
        return json;
      },
      async remove({ commit }: any, [id]: [string]) {
        const res = await fetch(`/api/{{entities}}/${id}`, {
          method: "DELETE"
        });
        if (!res.ok) {
          throw new Error(res.statusText);
        }
      }
    }
  }
};
