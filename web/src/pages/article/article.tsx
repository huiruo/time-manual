import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ModalLoading from '@/components/modal-loading';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { formatUnixTime } from '@/utils/index';
import Pagination from '@/components/pagination';
import timeManualApi from '@/services/timeManualApi';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './index.scss';

interface articleType {
  id: number;
  title: string;
  content: string;
  tag: string;
  update_time: string;
  created_time: string;
}

const Article = () => {

  const [articles, setArticles] = useState<articleType[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [pageCurrent, setPageCurrent] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryArticleUtil = async (currentPage: number, pageSize: number) => {
    const data = {
      currentPage,
      pageSize,
    };

    if (!showLoading) {
      setShowLoading(true);
    }

    try {
      const res = await timeManualApi.queryArticles(data);
      if (res.code === 200) {
        setShowLoading(false);
        const { totalCount: total, result } = res.data;
        setArticles(result);
        setTotalCount(total);
      } else {
        console.log('请求失败' + res.msg);
      }

    } catch (error) {
      console.log('请求文章失败', error);
    }

  };

  useEffect(() => {
    const hasPage = searchParams.has('page');

    if (hasPage) {
      const page = searchParams.get('page') as any;
      if (page) {
        const pageNum = parseInt(page);
        const page_parm = isNaN(pageNum) ? 1 : pageNum;
        setPageCurrent(page_parm);
        queryArticleUtil(page_parm, 10);
      }

    } else {
      setPageCurrent(1);
      queryArticleUtil(1, 10);
    }
  }, []);

  return (
    <>
      {articles.map((item, index) => {

        return (
          <div key={item.id} className='article-item'>
            <h4 className='article-title'>{item.title}</h4>
            <div className='article-info'>{formatUnixTime(item.created_time)}</div>
            <ReactMarkdown
              children={item.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');

                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={dark}
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

      {showLoading && <ModalLoading />}

      <Pagination
        total={totalCount}
        current={pageCurrent}
        onChange={(page: number, pageSize = 10) => {
          console.log('文章分页--->');
          setSearchParams({ page: page.toString() });
          queryArticleUtil(page, pageSize);
        }}
      />
    </>
  );

};

export default Article;
