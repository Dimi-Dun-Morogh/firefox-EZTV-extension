module.exports = {
  root: true,
  env: {
    node: true,
    webextensions: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'vue/no-unused-vars': 'off',
  },
};
