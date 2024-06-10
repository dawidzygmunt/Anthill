module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ["next/core-web-vitals"],
  plugins: ["my-lint"],
  rules: {
    // "my-lint/func-prefix-matching": [1, { include: [], exclude: [] }],
    "my-lint/enforce-page-metadata-format": [1, { include: [], exclude: [] }],
  },
}
