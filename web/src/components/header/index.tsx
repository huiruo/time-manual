import React, { FC, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTiemManualToken } from '@/utils/auth';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import './index.scss';
import { Dispatch } from 'redux';
import { LOGOUT } from '@/stores/actions/actiontypes';

interface HeaderProps {
  logoutAction?(): void
}

const Header: FC<HeaderProps> = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    // eslint-disable-next-line no-unused-expressions
    props.logoutAction && props.logoutAction();
    navigate('/login');
  };

  const logined: boolean = getTiemManualToken() ? true : false;
  console.log('Header:', logined);

  useEffect(() => {
    console.log('header props:', props);
    console.log('header props:', props.logoutAction);
  }, []);

  return (
    <div className='header-container nav-div-shadow'>
      <div className='header-content'>
        <ul className='ul'>
          <li className='li'>
            <NavLink to='/' className={pathname === '/' ? 'nav-active' : ''}>
              首页
            </NavLink>
          </li>

          <li className='li'>
            <NavLink
              to='/article'
              className={pathname === '/article' ? 'nav-active' : ''}
            >
              {/* 文章 */}
              test
            </NavLink>
          </li>

          <li className='li'>
            <NavLink
              to='/moments'
              className={pathname === '/moments' ? 'nav-active' : ''}
            >
              动态
            </NavLink>
          </li>

          <li className='li'>
            <NavLink
              to='/resume'
              className={pathname === '/resume' ? 'nav-active' : ''}
            >
              我的
            </NavLink>
          </li>
        </ul>
        <div className='header-container-right'>
          <Popover>
            <PopoverTrigger>
              <div>用户信息</div>
            </PopoverTrigger>

            <PopoverContent className='popover-content'>
              {() => (
                <div className='popover-logout' onClick={onLogout}>退出登录</div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state: any) => {
  return {
    userStore: state.userStore
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {

  return {
    logoutAction: () => dispatch({
      type: LOGOUT,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
