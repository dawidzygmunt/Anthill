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
  plugins: ["my-lint", "unused-imports"],
  rules: {
    // "my-lint/func-prefix-matching": [1, { include: [], exclude: [] }],
    "my-lint/enforce-page-metadata-format": [1, { include: [], exclude: [] }],
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
}
