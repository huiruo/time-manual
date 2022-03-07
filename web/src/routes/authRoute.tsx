import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTiemManualToken } from '@/utils/auth';

const AuthRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const isLogged: boolean = getTiemManualToken() ? true : false;
  console.log('PrivateRoute:', isLogged);

  return (isLogged ? <>{children}</> : (
    <Navigate
      replace={true}
      to='/login'
      state={{ from: `${location.pathname}${location.search}` }}
    />
  ));
};

export default AuthRoute;
