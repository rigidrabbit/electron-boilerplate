module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    'promise',
    'react',
  ],
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  rules: {
    'class-methods-use-this': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-void': 0,
    'no-console': 0,
    'comma-dangle': [2, 'always-multiline'],
    semi: [2, 'never'],
    'no-extra-semi': 2,
    quotes: [
      2,
      'single',
      {
        avoidEscape: false,
        allowTemplateLiterals: true,
      },
    ],
    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/jsx-no-bind': [
      2,
      {
        allowArrowFunctions: true,
        allowBind: false,
      },
    ],
    'react/prop-types': [
      2,
      {
        ignore: [
          'children',
          'className',
        ],
      },
    ],
    'react/jsx-no-literals': 0,
  },
}
