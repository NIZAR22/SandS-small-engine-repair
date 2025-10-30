module.exports = {
  root: true,
  env: {
    node: true
  },
  // Extends the Vue and Standard style guides
  // Standard provides opinionated but reasonable JavaScript rules
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // Use babel-eslint parser to understand modern JavaScript syntax
  parserOptions: {
    parser: 'babel-eslint'
  },
  // Custom rules - adjust these based on your preferences
  rules: {
    // Allow console.log during development, warn in production builds
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Allow debugger during development, warn in production builds
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Don't require trailing commas in multi-line objects/arrays
    'comma-dangle': ['error', 'never'],
    // Allow both single and double quotes
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    // Don't require semicolons (Standard style)
    'semi': ['error', 'never'],
    // Allow unused variables that start with underscore
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    // Require spaces inside curly braces { foo } not {foo}
    'object-curly-spacing': ['error', 'always'],
    // Allow async functions without await
    'require-await': 'off'
  }
}