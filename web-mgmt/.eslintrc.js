module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  /*
  'off'或者0  // 关闭规则关闭
  'warn'或者1  // 在打开的规则作为警告
  'error'或者2  // 把规则作为一个错误
  */
  rules: {
    // 参考：https://www.shangmayuan.com/a/f5a5d52e5fa24bb8a592a376.html

    'jsx-quotes': [2, 'prefer-single'],

    'indent': [1, 2],

    'quotes': [1, 'single'],
    // 'quotes': [1, 'double'],

    // 语句强制分号结尾
    // "semi": [1, "never"],
    'semi': [1, 'always'],

    // 如果一个变量不会被重新赋值，最好使用const进行声明。
    'prefer-const': 1,

    // 不允许多个空行
    'no-multiple-empty-lines': 1,

    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [1, 'always'],

    // 要求箭头函数的箭头之前和之后有空格
    'arrow-spacing': 1,

    // 要求在注释前有空白
    'spaced-comment': [1, 'always'],

    // 禁用行尾空格
    'no-trailing-spaces': 1,

    // 在变量声明、数组字面量、对象字面量、函数参数 和 序列中禁止在逗号前使用空格,要求在逗号后使用一个或多个空格
    'comma-spacing': ['error', { before: false, after: true }],

    // 禁止分号周围的空格
    'semi-spacing': ['error', { before: false, after: true }],

    // 禁止出现多个空格而且不是用来作缩进的
    'no-multi-spaces': 1,

    // 控制逗号前后的空格
    'comma-spacing': [2, { 'before': false, 'after': true }],

    // 函数调用时 函数名与()之间不能有空格
    'no-spaced-func': 2,

    // 块语句内行首行尾是否要空行
    'padded-blocks': 1,

    // 文末需要回车
    'eol-last': 1,

    // 变量声明后是否需要空一行
    'newline-after-var': 1,
    // 'newline-after-var': 0,

    // 要求 return 语句以前有一空行
    'newline-before-return':1
  }
};
