import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

interface IAuthRoute {
  children: React.ReactNode
  token?: string
}

const AuthRoute: FC<IAuthRoute> = (props) => {
  const { children, token } = props;
  const logined: boolean = token ? true : false;
  console.log('=====AuthRouteRender=====', logined);

  return (logined ? <>{children}</> : (
    <Navigate
      replace={true}
      to='/login'
      state={{ from: `${location.pathname}${location.search}` }}
    />
  ));
};

const mapStateToProps = (state: any) => {
  return {
    token: state.userStore.token
  };
};

export default connect(mapStateToProps, null)(AuthRoute);
