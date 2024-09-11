const baseConfig = require('./eslint.config.base');

const reactPlugin = require('@eslint-react/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const hooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.jsx', '**/*.tsx'],
    ...reactPlugin.configs.recommended,
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: hooksPlugin.configs.recommended.rules,
  },
];
