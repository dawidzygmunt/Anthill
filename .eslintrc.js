module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ["my-lint"],
  extends: ["next/core-web-vitals"],
  rules: {
    "my-lint/enforce-page-metadata-format": "error",
  },
}
