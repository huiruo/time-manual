## 依赖
```
npx create-react-app time-manual --template typescript
yarn add react-router
yarn add react-router-dom
yarn add @types/react-router-dom
yarn add cross-env
yarn add axios
yarn add @fower/react
```
### node-sass
https://www.html.cn/create-react-app/docs/adding-a-sass-stylesheet/
yarn add node-sass

### 兼容屏幕
```
rem 单位如何转换为像素值
当使用 rem 单位，他们转化为像素大小取决于页根元素的字体大小，即 html 元素的字体大小。 根元素字体大小乘以你 rem 值。 

例如，根元素的字体大小 16px，10rem 将等同于 160px，即 10 x 16 = 160。
4rem<---> 64px

14: 10rem -->140px
    <----->64
100: 8.5rem <---->850px
```

### 重命名路径
web\config\webpack.config.js
```js
extensions: paths.moduleFileExtensions
.map(ext => `.${ext}`).filter(ext => useTypeScript || !ext.includes('ts')),
    alias: {
    '@':path.resolve('src'),
    '@': path.resolve(__dirname, '../src'),
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    // Allows for better profiling with ReactDevTools
    ...(isEnvProductionProfile && {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
    }),
    ...(modules.webpackAliases || {}),
},
```

### tsconfig.json 
```
    "baseUrl": "./",
    "paths": {
        // "@/*": ["./src/*"],
        or:
        "@/*": ["src/*"],
    },
```