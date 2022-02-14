import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ArticleComponent from './article';
import './index.scss';

const Article = () => {

  return (
    <div className='root-container'>
      <Header />
      <div className='container'>
        {/* <div className='main-title'>借助于通透、明净的事物得到快乐</div> */}
        <ArticleComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Article;
