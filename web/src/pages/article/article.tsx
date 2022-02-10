import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`;
const input = '# This is a header\n\nAnd this is a paragraph';

const Article = () => {

  // const [markdownContent, setMarkdownContent] = useState(input);
  const [markdownContent, setMarkdownContent] = useState(markdown);

  return <div>
    <div>
      <ReactMarkdown
        children={markdownContent}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={docco}
                language={match[1]}
                PreTag='div'
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      />
    </div>
  </div>;
};

export default Article;
