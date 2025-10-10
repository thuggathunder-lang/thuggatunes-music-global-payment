module.exports = [
  // files/ignores configuration
  {
    ignores: ['node_modules', 'coverage'],
  },
  // basic rules for JS files
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 2021 },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
];
