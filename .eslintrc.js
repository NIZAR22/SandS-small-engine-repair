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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}