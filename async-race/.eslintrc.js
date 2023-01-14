module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    // "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier",
  ],
  env: {
    node: true,
    browser: true,
  },
  "rules": {
    "no-debugger": "off",
    "no-console": 0,
    "class-methods-use-this": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "error",
    "prettier/prettier": [
        "error",
        {
          "endOfLine": "auto"
        }
    ]
  }
};