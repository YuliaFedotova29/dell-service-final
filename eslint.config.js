import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      }
    },
    plugins: {
      prettier,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'import/no-unresolved': [2, { caseSensitive: false }],
      'import/order': [2, {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }],
      'indent': ['error', 2],
      'linebreak-style': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    }
  }
]