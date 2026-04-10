import reactPlugin from '@eslint-react/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import hooksPlugin from 'eslint-plugin-react-hooks';

// Allow importing from the local eslint base configuration.
import baseConfig from './eslint.config.js';

/**
 * The Ruby Group - ESLint React Configuration
 * @module @the-ruby-group/rgts/eslint.config.react.js
 *
 * This configuration acts as an ADDITIVE layer on top of our base configuration.
 * It introduces specialized AST parsers and rules necessary for React 18+ and modern
 * React Server Components, without forcing backend consumers to inherit front-end rules.
 *
 * Architecture notes:
 * 1. We spread `baseConfig` first to establish our global rules, ignores, and strict TS settings.
 * 2. We use `@eslint-react/eslint-plugin` instead of the legacy `eslint-plugin-react` because
 *    it is natively built for flat config and understands modern React/Hooks out of the box.
 * 3. We scope these rules strictly to `*.jsx` and `*.tsx` files to avoid slowing down
 *    the linting of standard utility files or APIs.
 *
 * Usage in consumer projects:
 *   // eslint.config.js
 *   import rgtsReact from '@the-ruby-group/rgts/eslint.config.react.js';
 *   export default rgtsReact;
 */
export default defineConfig([
  // -- Base Rules --
  // Inherit all strict typing, formatting, and import rules from the base configuration.
  ...baseConfig,

  // ==========================================================================
  // React & JSX Files
  // ==========================================================================
  {
    files: ['**/*.jsx', '**/*.tsx'],

    // We spread the modern eslint-react recommended ruleset.
    ...reactPlugin.configs.recommended,

    languageOptions: {
      // We must explicitly provide the TypeScript parser here again because the plugin
      // needs to construct its AST for JSX parsing.
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      // The official React Hooks plugin guarantees `useEffect` dependencies are accurate.
      'react-hooks': hooksPlugin,
    },

    rules: {
      // -- React Hooks --
      // Enforce the Rules of Hooks (e.g. don't call hooks conditionally).
      ...hooksPlugin.configs.recommended.rules,

      // -- Custom Overrides --
      // Allow importing from the local eslint base configuration.
      'n/no-unpublished-import': 'off',
    },
  },
]);
