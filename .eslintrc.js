module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    ['eslint:recommended', 'next/core-web-vitals'],
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
}
