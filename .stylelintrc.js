module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [],
  rules: {
    'at-rule-no-unknown': [
      true, {
        ignoreAtRules: ['define-mixin', 'mixin', 'each']
      }
    ],
    'property-no-unknown': [
      true, {
        ignoreProperties: [
          'composes',
          'font-smoothing'
        ]
      }
    ],
    'color-hex-case': 'lower',
    'font-family-name-quotes': 'always-where-recommended',
    'string-quotes': 'single',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global'
        ]
      }
    ]
  }
}
