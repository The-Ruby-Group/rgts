/**
 * The Ruby Group - Prettier Configuration
 * @module @the-ruby-group/rgts/prettier.config.js
 *
 * Architecture Notes:
 * - This config is shared between ESLint (via the 'prettier/prettier' rule) and Prettier
 *   so formatting stays consistent everywhere.
 * - We keep options minimal to avoid debates. Most settings rely on Prettier's defaults.
 *
 * Usage:
 * Create a `prettier.config.js` in your project root and export this file:
 *
 * ```javascript
 * export { default } from '@the-ruby-group/rgts/prettier.config.js';
 * ```
 */
export default {
  // Allow slightly wider lines on modern screens (default is 80).
  printWidth: 100,

  // Use single quotes for JS/TS strings (default is double quotes).
  singleQuote: true,

  // Explicitly use double quotes in JSX (matches standard HTML).
  jsxSingleQuote: false,

  // Add Prettier plugins here (e.g., tailwindcss).
  plugins: [],
};
