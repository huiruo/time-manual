import React, { useState } from 'react';
import timeManualApi from '@/services/timeManualApi';
import { setTiemManualToken } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [account, setAccount] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123456');
  const navigate = useNavigate();

  const setInputUtil = (e: any, type: number) => {
    const val = e.target.value;
    switch (type) {
      case 1:
        setAccount(val);
        break;
      case 2:
        setPassword(val);
        break;
      default:
        break;
    }
  };

  const onLogin = async () => {
    if (!account) {
      console.log('密码不能为空');

      return;
    }

    if (!password) {
      console.log('密码不能为空');

      return;
    }
    const data = {
      // account,
      username: account,
      password,
    };
    const res = await timeManualApi.loginApi(data);
    if (res.code === 200) {
      const { token } = res.result;
      setTiemManualToken(token);
      navigate('/');
    } else {
      console.log('登录错误', res.msg);
    }
  };

  return (
    <div className='sign-table'>
      <div className='table-item'>
        <label className='input-wrapper'>
          <input defaultValue={account} onChange={(e) => setInputUtil(e, 1)} className='login-input' placeholder='请输入账号' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input defaultValue={password} onChange={(e) => setInputUtil(e, 2)} type='password' className='login-input' placeholder='请输入注册密码' />
        </label>
      </div>

      <button onClick={onLogin} type='submit' className='m-button submit-btn'>
        登 录
      </button>
    </div>
  );

};

export default Login;
