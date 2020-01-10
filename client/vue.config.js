module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      },
      "^/graphql": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
};
