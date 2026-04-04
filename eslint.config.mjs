import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Rigor máximo conforme solicitado
    'no-console': 'error',
    'vue/multi-word-component-names': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error'
  }
})
