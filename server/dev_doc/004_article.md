## 第一步：sql

```sql
CREATE TABLE `article`  (
  `id` bigint(60) NOT NULL,
  `content` MEDIUMTEXT NOT NULL,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `update_time`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_time`  timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;
```

## 第二步，建立 article 模块
```
nest g service article
nest g controller article
nest g module article
```

## 第三步，前端引入第三方
```
markd

yarn add marked
yarn add marked
yarn add @types/marked
https://github.com/markedjs/marked
import marked from 'marked'


// 码高亮插件
yarn add highlight.js
https://github.com/highlightjs/highlight.js
use:
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
or:
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

参考：
https://zhuanlan.zhihu.com/p/102066070
```

#### react-markdown
https://github.com/remarkjs/react-markdown
```js
react-markdown

yarn add react-markdown
import ReactMarkdown from 'react-markdown'


参考1：
https://segmentfault.com/a/1190000020294373
```

### 高亮
```
react-syntax-highlighter

https://github.com/react-syntax-highlighter/react-syntax-highlighter

yarn add react-syntax-highlighter
```

```js
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const Component = () => {
  const codeString = '(num) => num + 1';
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  );
};
```