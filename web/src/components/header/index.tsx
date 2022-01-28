import React from 'react';
import { NavLink,useLocation } from "react-router-dom";
import './index.scss'

const Header =()=>{
  const { pathname } = useLocation()

  return (
    <div className='header-container nav-div-shadow'>
      <div className='header-content container'>
        <ul className='ul'>

          <li>
            <NavLink to="/" className={pathname==='/'?'nav-active':''}>首页</NavLink>
          </li>

          <li>
            <NavLink to="/article" className={pathname==='/article'?'nav-active':''}>文章</NavLink>
          </li>

          <li>
            <NavLink to="/moments" className={pathname==='/moments'?'nav-active':''}>动态</NavLink>
          </li>

          <li>
            <NavLink to="/resume" className={pathname==='/resume'?'nav-active':''}>我的</NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Header;