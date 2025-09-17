import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default eslint.config(
  eslint.configs.recommended,
  tsPlugin.configs.recommended,
  reactPlugin.configs.recommended,
  reactHooks.configs.recommended,
  {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.app.json'], // твой tsconfig
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {},
  },
);
