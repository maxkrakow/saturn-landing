import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'bindings/**',
    ],
  },
  js.configs.recommended,
  // React recommended flat config
  reactPlugin.configs.flat.recommended,
  // Next.js core-web-vitals rules (eslintrc-style config: take its rules)
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Local project rules
      'react/no-danger': 'error',
      'prefer-const': 'warn',
    },
  },
]
