import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  rules: {
    'antfu/top-level-function': 'off',
  },
  typescript: true,
})
