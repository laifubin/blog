module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/essential",
      "plugin:@typescript-eslint/recommended"
  ],
  // .vue文件的ESLint自定义解析器。
  "parser": "vue-eslint-parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "parser": "@typescript-eslint/parser",
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
    "vue/no-multiple-template-root": 0,
    "vue/multi-word-component-names": 0,
    "vue/no-v-model-argument": 0
  }
}
