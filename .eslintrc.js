module.exports = {
  "env": {
    "browser": true,
  },
  "extends": "eslint:recommended",
  "plugins": [
    "@typescript-eslint",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sorcetype": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/semi": "none",
  }
};