module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // '@typescript-eslint/interface-name-prefix': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-explicit-any': 'off',
    'jsx-quotes': [2, 'prefer-single'],
    // "indent": ["error", 2]    
    'indent': [1, 2],
    'quotes': [1, 'single'],
    // 'quotes': [1, 'double'],
    // 语句强制分号结尾
    // "semi": [1, "never"],
    'semi': [1, 'always'],
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [0, 'always']
  },
};
