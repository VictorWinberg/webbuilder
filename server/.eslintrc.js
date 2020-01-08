module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  }
};
