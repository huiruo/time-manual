import React from 'react';
import './index.scss';

const Login = () => {

  return (
    <div className='login-main'>
      <div className='login-content'>
        <div className='login-table'>
          <div className='table-item'>
            <label className='input-wrapper'>
              <input className='login-input' placeholder='请输入邮箱注册' />
            </label>
          </div>
          <div className='table-item'>
            <label className='input-wrapper'>
              <input className='login-input' placeholder='请输入注册密码' />
            </label>
          </div>
          <div className='table-item'>
            <label className='input-wrapper'>
              <input className='login-input' placeholder='请确认密码' />
            </label>
          </div>
          <div>
            <button type='submit' >
              登录
            </button>
          </div>
        </div>

        <footer>
          test
        </footer>
      </div>
    </div>
  );

};

export default Login;
