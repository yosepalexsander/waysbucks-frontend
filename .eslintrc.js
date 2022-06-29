module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['next/core-web-vitals', 'next', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-simple-import-sort', 'prettier'],
  rules: {
    'max-len': ['error', 120],
    'no-unused-expressions': 0,
    '@typescript-eslint/consistent-type-imports': 2,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: false, avoidEscape: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-default-export': 'error',
    'import/no-unused-modules': 0,
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
      },
    ],
    'react/display-name': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/self-closing-comp': [
      1,
      {
        component: true,
        html: true,
      },
    ],
    'react-hooks/exhaustive-deps': ['error', { additionalHooks: '(useMemoOne)' }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  globals: {
    JSX: 'readonly',
  },
};
