import React from 'react'
import Header from '@/components/header'
import MomentsContent from './moments-content'
import './index.scss'

const Moments =()=>{
  return (
    <div className='root-container'>
      <Header />
      <div className='container test-bg'>
        <div className='title'>时间谱</div>
        <div className='content'>

          <div className='main-content col-sm-12'>
            主要内容
            <MomentsContent />
          </div>

          <div className='right-content col-sm-12'>
            侧边栏
          </div>

        </div>
      </div> 
    </div>
  );
}

export default Moments;
