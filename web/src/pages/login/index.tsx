import React, { useState } from 'react';
import './index.scss';
import Login from './login';
import Register from './register';
import Footer from '@/components/footer';

const Sign = () => {

  const [selectTab, setSelectTab] = useState<number>(1);

  const onSignTab = (tabLength: number) => {
    setSelectTab(tabLength);
  };

  return (
    <div className='sign-main'>

      <div className='sign-container'>

        <div className='sign-content'>
          <div className='sign-table-content'>
            <div className='sign-tabs'>
              <div onClick={() => onSignTab(1)} className={`${selectTab === 1 ? 'sign-tab--active ' : ''}tab-item`}>登录</div>
              <div onClick={() => onSignTab(2)} className={`${selectTab === 2 ? 'sign-tab--active ' : ''}tab-item`}>注册</div>
            </div>
            {selectTab === 1 ? <Login /> : <Register />}
          </div>
        </div>

        <footer className='sign-footer'>
          <Footer />
        </footer>
      </div>

    </div>
  );

};

export default Sign;
