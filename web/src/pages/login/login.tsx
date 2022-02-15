import React, { useState } from 'react';

const Login = () => {

  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const setInputUtil = (e: any, type: number) => {
    const val = e.target.value;
    switch (type) {
      case 1:
        console.log('setAccount');
        setAccount(val);
        break;
      case 2:
        console.log('password');
        setPassword(val);
        break;
      default:
        break;
    }
  };

  const onLogin = () => {
    if (account) {
      console.log('密码不能未空');

      return;
    }

    if (password) {
      console.log('密码不能未空');

      return;
    }
    const data = {
      account,
      password
    };
    console.log('onRegister', data);
  };

  return (
    <div className='sign-table'>
      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 1)} className='login-input' placeholder='请输入账号' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 2)} type='password' className='login-input' placeholder='请输入注册密码' />
        </label>
      </div>

      <button onClick={onLogin} type='submit' className='m-button submit-btn'>
        登 录
      </button>
    </div>
  );

};

export default Login;
