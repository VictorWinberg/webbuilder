export default {
  <%component%>: {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
      async create(_: any, payload: any) {
        const res = await fetch("/api/products", {
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
      async list(_: any) {
        const res = await fetch("/api/<%components%>");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return await res.json();
      },
      async read(_: any, id: string) {
        const res = await fetch(`/api/<%components%>/${id}`);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return await res.json();
      },
      async update(_: any, { id = null, ...payload }) {
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
        return await res.json();
      }
    }
  }
};



