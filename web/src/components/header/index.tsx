import React from 'react';
import { NavLink } from "react-router-dom";
import './index.scss'

const Header =()=>{
  return (
    <div className='header-container nav-div-shadow'>
      <div className='header-content'>
        <ul className='ul'>

          <li>
            <NavLink to="/" className="nav-active">首页</NavLink>
          </li>

          <li>
            <NavLink to="/article" className="nav-active">文章</NavLink>
          </li>

          <li>
            <NavLink to="/moments" className="nav-active">动态</NavLink>
          </li>

          <li>
            <NavLink to="/resume" className="nav-active">我的</NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default Header;