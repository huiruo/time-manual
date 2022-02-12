import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import timeManualApi from '@/services/timeManualApi';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './index.scss';

/*
const markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`;
*/

// const input = '# This is a header\n\nAnd this is a paragraph';

interface articleType {
  id: number;
  content: string;
  tag: string;
  update_time: string;
  created_time: string;
}

const Article = () => {

  // const [markdownContent, setMarkdownContent] = useState(markdown);
  const [articles, setArticles] = useState<articleType[]>([]);

  const queryArticleUtil = async (currentPage: number, pageSize: number) => {
    const data = {
      currentPage,
      pageSize,
    };

    try {
      const res = await timeManualApi.queryArticles(data);
      // setTimeout(() => {
      if (res.code === 200) {
        console.log('文章返回_res', res);
        const { totalCount, result } = res.data;
        setArticles(result);
        console.log('totalCount', totalCount);
        // const { totalCount, result } = res.data;
        // setShowLoading(false);
        // setMoments(result);
        // setTotalCount(totalCount);
      } else {
        console.log('请求失败' + res.msg);
      }

    } catch (error) {
      console.log('请求文章失败', error);
    }

  };

  useEffect(() => {
    queryArticleUtil(1, 10);
  }, []);

  console.log('articles:', articles);

  return (
    <>
      {articles.map((item, index) => {

        return (
          <div key={item.id} className='article-item'>
            <div>测试:{index + 1}</div>
            <ReactMarkdown
              children={item.content}
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
        );

      })}
    </>
  );

};

export default Article;
