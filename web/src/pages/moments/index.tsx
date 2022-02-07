import React from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import MomentsContent from './moments-content'
import './index.scss'

const Moments =()=>{
  return (
    <div className='root-container'>
      <Header />
      <div className='container'>
        <div className='main-title'>
          借助于通透、明净的事物得到快乐
        </div>
        <div className='content'>

          <div className='main-content col-sm-12'>
            <MomentsContent />
          </div>

          <div className='right-content col-sm-12'>
            {/* 侧边栏 */}
          </div>

        </div>
      </div> 
      <Footer />
    </div>
  );
}

export default Moments;
