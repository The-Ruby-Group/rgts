<h1 style="display: flex; align-items: center;">
  <a href="https://github.com/the-ruby-group" style="display: flex; align-items: center; margin-right: 12px">
    <img width="48px" height="48px" src="https://static.the-ruby-group.com/img/rubyGroup.svg" alt="The Ruby Group" />
  </a>
  @the-ruby-group/rgts
</h1>

[`@the-ruby-group/rgts`](https://www.npmjs.com/package/@the-ruby-group/rgts) is an opinionated, zero-config setup for TypeScript projects. It bundles strict type checking, modern ESLint 9 (Flat Config) rules, and Prettier formatting into a single, easy-to-use package.

We built this to eliminate the debate around tooling setup. Just install it, extend it, and get back to building.

## What's Inside?

- **Modern ESLint 9:** Fully embraces the new Flat Config (`eslint.config.js`). It's type-safe, incredibly strict, and separates Node.js backend rules from React frontend rules so you only get what you need.
- **Prettier Integrated:** Formatting is run _as an ESLint rule_, meaning you get formatting feedback directly in your editor's linter pass without needing a separate step.
- **Ruthless Type Safety:** Our TypeScript configs go far beyond `strict: true`, turning on features like `exactOptionalPropertyTypes` and `noUncheckedIndexedAccess` to catch bugs before they ever hit runtime.

## Installation

Install `@the-ruby-group/rgts` along with its peer dependencies (if your package manager doesn't do it automatically):

```bash
# npm
npm install --save-dev @the-ruby-group/rgts eslint prettier typescript

# yarn
yarn add --dev @the-ruby-group/rgts eslint prettier typescript

# pnpm
pnpm add -D @the-ruby-group/rgts eslint prettier typescript

# bun
bun add -d @the-ruby-group/rgts eslint prettier typescript
```

## Usage

Depending on what you are building, pick the setup that matches your project below.

### Option A: Base Setup (Node.js / Pure TypeScript)

If you are building a backend API, a CLI, or a standard TypeScript utility library, use the base configurations.

**1. ESLint:** Create a file named `eslint.config.js` (or `.mjs`) at the root of your project:

```javascript
import rgtsBase from '@the-ruby-group/rgts/eslint.config.js';

export default rgtsBase;
```

_(Need to add custom rules? You can wrap the export in ESLint's `defineConfig` or spread the array.)_

**2. TypeScript:** Create a file named `tsconfig.json` at the root of your project:

```json
{
  "extends": "@the-ruby-group/rgts/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

_(Note: We intentionally don't set `outDir`, `rootDir`, or `include` in our shared tsconfigs because those are always project-specific.)_

**3. Prettier:** Create a file named `prettier.config.js` (or `.mjs`) at the root of your project:

```javascript
export { default } from '@the-ruby-group/rgts/prettier.config.js';
```

---

### Option B: React Setup (Next.js / Vite / RSC)

If you are building a frontend application, use the React configurations. This layer automatically includes the base rules, plus all the necessary React AST parsers and Hooks rules.

**1. ESLint:** Create a file named `eslint.config.js` (or `.mjs`) at the root of your project:

```javascript
import rgtsReact from '@the-ruby-group/rgts/eslint.config.react.js';

export default rgtsReact;
```

**2. TypeScript:** Create a file named `tsconfig.json` at the root of your project:

```json
{
  "extends": "@the-ruby-group/rgts/tsconfig.react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

_(Note: We intentionally don't set `outDir`, `rootDir`, or `include` in our shared tsconfigs because those are always project-specific.)_

**3. Prettier:** Create a file named `prettier.config.js` (or `.mjs`) at the root of your project:

```javascript
export { default } from '@the-ruby-group/rgts/prettier.config.js';
```

---

### Recommended: Pre-commit Hooks

We strongly recommend using `husky` and `lint-staged` to enforce these rules before any bad code makes it into your repository. As a bonus, we suggest throwing in `sort-package-json` to keep your dependencies automatically organized!

1. **Install the tools:**

```bash
npm install --save-dev husky lint-staged sort-package-json
```

2. **Initialize Husky:**

```bash
npx husky init
```

3. **Configure lint-staged in your `package.json`:**

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}": "eslint --fix",
    "*.{json,md,yaml,yml,html,css}": "prettier --write",
    "package.json": "sort-package-json"
  }
}
```

4. **Update your `.husky/pre-commit` file:**
   Ensure your `.husky/pre-commit` file contains the following command to run your linting process before committing:

```bash
npx lint-staged
```

Now, every time you commit, your code will be automatically linted, formatted, and your `package.json` will be perfectly sorted. No more messy diffs!

## License

[MIT License](./LICENSE)
