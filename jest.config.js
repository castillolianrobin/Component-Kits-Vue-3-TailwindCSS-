module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  modulePathIgnorePatterns : ["<rootDir>/tests/unit/common/"]
}
