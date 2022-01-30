import React from 'react'
import Header from '@/components/header'

const Moments =()=>{
  return (
    <div className='root-container'>
      <Header />
      <div className='container test-bg'>
        <div className='title'>这是标题</div>
        <div className='content'>

          <div className='main-content col-sm-12'>
            主要内容
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
