module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  // env: {
  //   browser: true,
  //   node: true,
  //   es6: true
  // },
  /*
  'off'或者0  // 关闭规则关闭
  'warn'或者1  // 在打开的规则作为警告
  'error'或者2  // 把规则作为一个错误
  */
  rules: {
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
  }
};