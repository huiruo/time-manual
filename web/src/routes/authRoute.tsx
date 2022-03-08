import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTiemManualToken } from '@/utils/auth';

const AuthRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const logined: boolean = getTiemManualToken() ? true : false;
  console.log('PrivateRoute:', logined);

  return (logined ? <>{children}</> : (
    <Navigate
      replace={true}
      to='/login'
      state={{ from: `${location.pathname}${location.search}` }}
    />
  ));
};

export default AuthRoute;
