import React, { FC } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Dispatch } from 'redux';
import { LOGOUT } from '@/stores/actions/actiontypes';
import { IUser } from '@/utils/types';
import './index.scss';

interface HeaderProps {
  logoutAction?(): void;
  user?: IUser;
  token?: string
}

const Header: FC<HeaderProps> = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    // eslint-disable-next-line no-unused-expressions
    props.logoutAction && props.logoutAction();
    navigate('/login');
  };

  console.log('===headerReder===', props);

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
              to='/analyze'
              className={pathname === '/analyze' ? 'nav-active' : ''}
            >
              数据分析
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

/*
const mapStateToProps = (state: any) => {
  return {
    user: state.userStore.user,
  };
};
*/

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logoutAction: () => dispatch({
      type: LOGOUT,
    }),
  };
};

export default connect(null, mapDispatchToProps)(Header);
