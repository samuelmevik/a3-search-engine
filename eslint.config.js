import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat["jsx-runtime"],
  eslintConfigPrettier,
  {
    rules: {
      "no-debugger": "warn",
      "no-unused-vars": "warn",
      "no-constant-condition": "warn",
      "no-empty": "warn",
      "no-extra-boolean-cast": "warn",
    },
  },
];
