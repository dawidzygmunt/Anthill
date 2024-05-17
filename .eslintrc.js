module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ["eslint:recommended"],
  plugins: ["my-lint"],
  rules: {
    "my-lint/func-prefix-matching": [1, { include: [], exclude: [] }],
    // We can include or exclude prefix
    // You can add more option here like message, ignore case etc.
  },
}
