/** @type {import("prettier").Config} */
module.exports = {
  // Extend `gts` prettier config
  ...require('gts/.prettierrc.json'),
  // Custom configurations
  bracketSpacing: true,
  trailingComma: 'es5',
  overrides: [
    /*
     * JSONC
     */
    {
      files: '*.jsonc',
      options: {
        trailingComma: 'none', // Disable trailing commas for jsonc files
      },
    },
  ],
};
