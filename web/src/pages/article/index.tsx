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
        <ArticleComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Article;
