module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/no-dynamic-require': 0,
    'import/no-webpack-loader-syntrax': 0,
    'jsx-a11y/medua-has-caption': 0,
    'no-loop-func': 0,
    'no-bitwise': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'no-script-url': 0,
    'class-methods-use-this': 0,
    'import/prefer-default-export': 0,
    'react/sort-prop-types': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-sort-default-props': 'error',
    'linebreak-style': 0,
  },
};
