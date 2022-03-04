import React from 'react';
import { Navigate } from 'react-router-dom';
import { getTiemManualToken } from '@/utils/auth';

const PrivateRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const isLogged: boolean = getTiemManualToken() ? true : false;
  // const isLogged: boolean = getTiemManualToken() ? false : false;
  console.log('PrivateRoute:', isLogged);

  {/* <div id='testId'>test</div>*/ }

  return (isLogged ? <>{children}</> : (
    <Navigate
      replace={true}
      to='/login'
      state={{ from: `${location.pathname}${location.search}` }}
    />
  ));
};

export default PrivateRoute;
