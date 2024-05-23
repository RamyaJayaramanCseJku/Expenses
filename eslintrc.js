module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  plugins: ["react", "react-hooks"],
  rules: {
    "no-unused-vars": "warn",
    "quotes": [1, "double"],
    "indent": [1,"error"],
    "eqeqeq": 1,
    "space-before-function-paren": [1, "always"],
 
  },
};
 