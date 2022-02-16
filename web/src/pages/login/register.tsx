import React, { useState } from 'react';
import timeManualApi from '@/services/timeManualApi';

const Register = () => {

  const [account, setAccount] = useState<string>('');
  const [nickname, setNikename] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const setInputUtil = (e: any, type: number) => {
    const val = e.target.value;
    switch (type) {
      case 1:
        setAccount(val);
        break;
      case 2:
        setNikename(val);
        break;
      case 3:
        setPassword(val);
        break;
      case 4:
        setConfirmPassword(val);
        break;
      default:
        break;
    }
  };

  const onRegister = async () => {
    if (!nickname) {
      console.log('昵称不能为空');

      return;
    }
    if (!account) {
      console.log('邮箱账户不能为空');

      return;
    }
    if (!password) {
      console.log('密码不能为空');

      return;
    }
    if (!confirmPassword) {
      console.log('请确认密码');

      return;
    }
    if (password !== confirmPassword) {
      console.log('确认密码不一致');

      return;
    }

    const data = {
      account,
      nickname,
      password
    };

    const res = await timeManualApi.registerApi(data);
    if (res.code === 200) {
      console.log('注册成功', res);
    } else {
      console.log('注册失败', res);
    }
  };

  return (
    <div className='sign-table'>
      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 1)} className='login-input' placeholder='请输入注册邮箱,用于登录' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 2)} className='login-input' placeholder='请输入昵称,用于展示' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 3)} type='password' className='login-input' placeholder='请输入密码' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 4)} type='password' className='login-input' placeholder='请确认密码' />
        </label>
      </div>

      <button onClick={onRegister} type='submit' className='m-button submit-btn'>
        注 册
      </button>
    </div>
  );

};

export default Register;
