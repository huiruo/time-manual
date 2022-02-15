import React, { useState } from 'react';

const Register = () => {

  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

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
      case 3:
        console.log('comfirm');
        setConfirmPassword(val);
        break;
      default:
        break;
    }
  };

  const onRegister = () => {
    if (password !== confirmPassword) {
      console.log('确认密码不一致');

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
          <input onChange={(e) => setInputUtil(e, 1)} className='login-input' placeholder='请输入注册邮箱' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 2)} type='password' className='login-input' placeholder='请输入密码' />
        </label>
      </div>

      <div className='table-item'>
        <label className='input-wrapper'>
          <input onChange={(e) => setInputUtil(e, 3)} type='password' className='login-input' placeholder='请再次确认密码' />
        </label>
      </div>

      <button onClick={onRegister} type='submit' className='m-button submit-btn'>
        注 册
      </button>
    </div>
  );

};

export default Register;
