module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
      "max-len": ["error", {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignorePattern: "data:"
      }],
    },
    env: {
      browser: true,
      node: true,
    },
  };
  