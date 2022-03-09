import React, { useState } from 'react';
import timeManualApi from '@/services/timeManualApi';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from '@/stores/actions/userActions';

interface LonginProps {
  loginAction?(tokeng: string): void
}

interface IResult {
  token: string
}

const Login = (props: LonginProps) => {

  const [account, setAccount] = useState<string>('admin');
  const [password, setPassword] = useState<string>('123456');
  const navigate = useNavigate();

  const handleLoginAction = (token: string) => {
    // eslint-disable-next-line no-unused-expressions
    props.loginAction && props.loginAction(token);
  };

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
      const { token } = res.result as IResult;
      handleLoginAction(token);
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

// const mapDispatchToProps = (dispatch: Dispatch) => {
const mapDispatchToProps = (dispatch: any) => {

  return {
    loginAction: (data: string) => dispatch(loginAction(data)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
