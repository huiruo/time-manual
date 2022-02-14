import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './index.scss';

const Header = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onToLogin = () => {
    navigate('/login');
  };

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
          <span onClick={onToLogin}>登录</span>
        </div>
      </div>
    </div>
  );

};

export default Header;
