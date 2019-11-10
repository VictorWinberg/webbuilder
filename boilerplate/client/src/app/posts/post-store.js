export default {
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, posts) => {
      state.posts = posts;
    }
  },
  actions: {
    async refreshPosts({ commit }) {
      const posts = await fetch("/api/posts");
      commit("setPosts", await posts.json());
    }
  }
};
