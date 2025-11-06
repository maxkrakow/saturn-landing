// @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 120,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles/tailwind.css',
}

export default config
