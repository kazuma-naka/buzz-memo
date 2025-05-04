import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { languageOptions: { globals: globals.nodeBuiltin } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
