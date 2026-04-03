# GEMINI.md - @the-ruby-group/rgts

## Project Overview

`@the-ruby-group/rgts` is a collection of standardized, reusable configurations for TypeScript development, extending Google's [`gts`](https://github.com/google/gts/) tooling. It provides a unified set of rules for ESLint, Prettier, and TypeScript to ensure consistency across multiple projects within The Ruby Group.

### Main Technologies
- **TypeScript**: Base and React-specific configurations.
- **ESLint (v9+)**: Flat configuration system with specialized plugins for React, Node.js, and import sorting.
- **Prettier**: Consistent code formatting extending Google's standards.
- **Bun**: Preferred package manager and runtime for development and scripts.
- **Vite**: Used in the example application for fast React development.

### Architecture
The project is structured as a configuration-only package that exports several files to be consumed by other projects:
- **ESLint**:
  - `eslint.config.gts.js`: The foundation, extending Google's recommended rules and `typescript-eslint`.
  - `eslint.config.base.js`: Adds Prettier integration and `simple-import-sort`.
  - `eslint.config.react.js`: Extends the base configuration with React-specific plugins (`@eslint-react/eslint-plugin`, `eslint-plugin-react-hooks`).
- **TypeScript**:
  - `tsconfig.base.json`: Default TypeScript compiler options extending `gts`.
  - `tsconfig.react.json`: Extensions for React projects (e.g., `jsx: react-jsx`).
- **Prettier**:
  - `prettier.config.js`: Shared formatting rules extending `gts` with custom overrides (e.g., `bracketSpacing: true`).

## Building and Running

### Root Project
The root project primarily manages the configuration files.
- **Sort package.json**: `bun run sort-package-json`

### Example Application (`example-vite-app/`)
A demonstration of how to integrate these configurations in a React + Vite project.
- **Development**: `bun dev` (runs on port 3000)
- **Build**: `bun run build` (runs `tsc` and `vite build`)
- **Preview**: `bun run preview`

## Development Conventions

### Coding Style
- **Strict TypeScript**: Configurations enforce strict null checks and avoid unsafe patterns.
- **Import Sorting**: `simple-import-sort` is used to maintain a consistent import order (side effects, parent, relative, and `@/` aliases).
- **ESLint Flat Config**: All linting uses the new ESLint flat configuration format.

### Integration Patterns
- **Extending ESLint**: Projects should import the desired configuration (e.g., `eslint.config.react.js`) and spread it into their `eslint.config.js` array.
- **Extending TSConfig**: Use the `extends` property in `tsconfig.json` to point to `@the-ruby-group/rgts/tsconfig.base.json` or `tsconfig.react.json`.
- **Prettier**: Projects should extend the provided `prettier.config.js` to ensure formatting consistency.

### Key Files
- `eslint.config.js`: Entry point for the base ESLint configuration.
- `eslint.config.react.js`: Recommended for React-based projects.
- `tsconfig.base.json`: The core TypeScript configuration.
- `example-vite-app/`: Reference implementation for consumers.
