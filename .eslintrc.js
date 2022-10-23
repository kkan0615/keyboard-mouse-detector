module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    // For Coding
    'quotes': [ 'error', 'single' ], // "" => ''
    'semi': [ 'error', 'never' ], // semicolon
    'no-empty': 'error', // No empty in bracket
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'comma-dangle': [ 'error', 'only-multiline' ], // Ex) { a, b, }
    'object-curly-spacing': [ 'error', 'always' ], // Space between { },
    'no-multi-spaces': 'error', // Ex) var a =  1 => var a = 1
    'no-unused-vars': 'off', // off in order to use @typescript-eslint/no-unused-vars
    'space-before-blocks': 'error', // Ex) if (a){ => if (a) {
    'no-trailing-spaces': 'error', // No trailing spaces important!!
    'valid-jsdoc': 'off', // Prevent to make annoying for js doc
    'no-tabs': 0, // Prevent typescript Tabs error
    // For Typescript
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 'argsIgnorePattern': '^_' }
    ], // no-unused-vars
    'array-bracket-spacing': [ 'error', 'always' ],
    // For React
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-spacing': [
      2,
      { 'when': 'always', 'children': { 'when': 'always' } }
    ],
    'max-len': [ 'error', { 'code': 150 } ],
  },
}
