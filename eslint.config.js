const simpleImportSort = require('eslint-plugin-simple-import-sort');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const nodePlugin = require('eslint-plugin-n');
// Import the configuration from eslint.config.gts.js
const gtsConfig = require('./eslint.config.gts');

module.exports = [
  ...gtsConfig,
  {
    plugins: {
      n: nodePlugin,
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-empty-pattern': 'warn',
      'n/no-extraneous-import': 'off',
      'n/no-unpublished-import': 'error',
      'prettier/prettier': 'error',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
    },
  },
];
