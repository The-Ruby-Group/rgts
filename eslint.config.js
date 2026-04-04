import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

import prettierConfig from './prettier.config.js';

/**
 * The Ruby Group - ESLint Base Configuration
 * @module @the-ruby-group/rgts/eslint.config.js
 *
 * This is an OPINIONATED, zero-config ESLint setup for TypeScript projects. It enforces strict
 * type safety, consistent formatting, and clean imports.
 *
 * Architecture notes:
 * 1. We use `defineConfig()` from ESLint core (`eslint/config`) for type-safe configuration and
 *    better IDE autocompletion.
 * 2. Prettier is run AS an ESLint rule (via eslint-plugin-prettier) so that formatting violations
 *    surface in the same linter pass -- no separate step.
 * 3. eslint-config-prettier is placed LAST to disable any formatting rules that conflict with Prettier.
 * 4. Test/config files get relaxed rules because they legitimately import from devDependencies (vitest, jest, build tools, etc.)
 *
 * Usage in consumer projects:
 *   // eslint.config.js
 *   import rgts from '@the-ruby-group/rgts/eslint.config.js';
 *   export default rgts;
 */
export default defineConfig([
  // -- Global Ignores --
  // We use a trailing slash to explicitly tell ESLint's glob matcher that these are directories.
  // This causes ESLint to instantly prune and skip the entire tree, which is much faster than `**`.
  globalIgnores(['**/node_modules/', '**/dist/', '**/build/', '**/coverage/']),

  // -- Base Recommended Rules --
  // Provides foundational rules for both JS and TS.
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // ==========================================================================
  // TypeScript Files
  // ==========================================================================
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],

    // -- Advanced Type-Checked Rules --
    // We extend strict type-checked rules which require a TS Project Service to operate.
    // These catch deep logical bugs that basic AST linting cannot find.
    extends: [...tseslint.configs.strictTypeChecked],

    languageOptions: {
      // Automatically locates the nearest tsconfig.json to power the type-checked rules above.
      parserOptions: { projectService: true },
    },

    plugins: {
      n: eslintPluginN,
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },

    rules: {
      // -- TypeScript Specific --
      // @typescript-eslint/consistent-type-imports: Forces `import type` for type-only imports to help bundlers.
      '@typescript-eslint/consistent-type-imports': 'error',
      // @typescript-eslint/no-explicit-any: Strictly forbids `any`. Use `unknown` if you truly don't know the type.
      '@typescript-eslint/no-explicit-any': 'error',
      // @typescript-eslint/no-unused-vars: Errors on unused variables, but allows unused parameters prefixed with `_`.
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      // -- General Best Practices --
      // no-empty-pattern: Warns on empty object destructuring (`const {} = obj;`).
      'no-empty-pattern': 'warn',
      // no-var / prefer-const: Enforces modern ES6 block scoping.
      'no-var': 'error',
      'prefer-const': 'error',

      // -- Imports & Modules --
      // n/no-unpublished-import: Prevents importing devDependencies in production source code.
      'n/no-unpublished-import': 'error',
      // simple-import-sort: Auto-sorts imports (builtin > external > internal > relative) and exports alphabetically.
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',

      // -- Formatting (Prettier) --
      // prettier/prettier: Surfaces formatting violations directly as ESLint errors using our shared config.
      'prettier/prettier': ['error', prettierConfig],
    },
  },

  // ==========================================================================
  // JavaScript Files
  // ==========================================================================
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],

    plugins: {
      n: eslintPluginN,
      'simple-import-sort': simpleImportSort,
      prettier: eslintPluginPrettier,
    },

    rules: {
      // -- General Best Practices --
      // no-empty-pattern: Warns on empty object destructuring (`const {} = obj;`).
      'no-empty-pattern': 'warn',
      // no-var / prefer-const: Enforces modern ES6 block scoping.
      'no-var': 'error',
      'prefer-const': 'error',

      // -- Imports & Modules --
      // n/no-unpublished-import: Prevents importing devDependencies in production source code.
      'n/no-unpublished-import': 'error',
      // simple-import-sort: Auto-sorts imports (builtin > external > internal > relative) and exports alphabetically.
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',

      // -- Formatting (Prettier) --
      // prettier/prettier: Surfaces formatting violations directly as ESLint errors using our shared config.
      'prettier/prettier': ['error', prettierConfig],
    },
  },

  // ==========================================================================
  // Overrides (Tests & Configuration Files)
  // ==========================================================================
  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/*.config.{js,jsx,mjs,cjs,ts,tsx,mts,cts}',
      '**/vite.config.*',
      '**/vitest.config.*',
      '**/jest.config.*',
      '**/__tests__/**',
      '**/tests/**',
      '**/test/**',
    ],
    rules: {
      // -- Imports & Modules --
      // n/no-unpublished-import: Disabled here because tests and configs legitimately import from devDependencies.
      'n/no-unpublished-import': 'off',
    },
  },

  // ==========================================================================
  // Conflict Resolution (Must be LAST)
  // ==========================================================================
  // eslint-config-prettier cleanly disables all ESLint rules that conflict with Prettier's formatting.
  // Note: This does NOT disable 'prettier/prettier' above; it merely stops ESLint's native formatting rules (like `quotes`).
  eslintConfigPrettier,
]);
