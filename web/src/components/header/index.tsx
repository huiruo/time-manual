import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getTiemManualToken, removeTiemManualToken } from '@/utils/auth';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import './index.scss';

const Header = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onToLogin = () => {
    navigate('/login');
  };

  const onLogout = () => {
    console.log('onLogout===>');
    removeTiemManualToken();
    navigate('/login');
  };

  const logined: boolean = getTiemManualToken() ? true : false;
  console.log('Header:', logined);

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

export default Header;
