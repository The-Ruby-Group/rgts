<h1 style="display: flex; align-items: center;">
  <a href="https://github.com/the-ruby-group" style="display: flex; align-items: center; margin-right: 12px">
    <img width="48px" height="48px" src="https://static.the-ruby-group.com/img/rubyGroup.svg" alt="Switchboard Banner" />
  </a>
  @the-ruby-group/rgts
</h1>

[`@the-ruby-group/rgts`](https://www.npmjs.com/package/@the-ruby-group/rgts) is an extension of Google's [`gts`](https://github.com/google/gts/) tooling, providing enhanced configurations for ESLint, Prettier, and TypeScript. This package is designed to simplify and standardize TypeScript development across multiple projects, ensuring consistency in code style, linting, and type checking.

## Features

- **Extended ESLint configuration** based on `gts` to enforce best practices.
- **Prettier integration** for automatic code formatting.
- **TypeScript configurations** for base and React-specific projects.

## Installation

To install `@the-ruby-group/rgts`, run:

```bash
# npm
npm install --save-dev @the-ruby-group/rgts

# yarn
yarn add --dev @the-ruby-group/rgts

# pnpm
pnpm add -D @the-ruby-group/rgts

# bun
bun add -d @the-ruby-group/rgts
```

## Usage

An example of usage can be found [in the project repository](https://github.com/The-Ruby-Group/rgts/tree/main/example-vite-app).

### Extend ESLint Configuration

In your `eslint.config.mjs` file, extend the configuration provided by `@the-ruby-group/rgts`:

```js
// Import the configuration from @the-ruby-group/rgts
import rubyGroupConfig from '@the-ruby-group/rgts/eslint.config.js';

export default [
  ...rubyGroupConfig,
  // Extra project-specific ESLint configurations can be added here...
];
```

### Prettier Configuration

Add a `prettier.config.mjs` file and extend the configuration:

```js
import rubyGroupConfig from '@the-ruby-group/rgts/prettier.config.js';

export default {
  ...rubyGroupConfig,
  // Extra project-specific settings can be added here...
};
```

### TypeScript Configuration

Extend the TypeScript configuration by specifying `tsconfig.json`:

For base configuration:

```json
{
  "extends": "@the-ruby-group/rgts/tsconfig.base.json"
}
```

For React projects:

```json
{
  "extends": "@the-ruby-group/rgts/tsconfig.react.json"
}
```

## License

[MIT License](./LICENSE)
