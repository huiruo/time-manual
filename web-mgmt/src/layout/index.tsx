import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import NavMenu from '@/layout/navMenu'
import './index.scss'

const { Footer, Sider } = Layout;

interface layoutContainerType{
  children:React.ReactElement,
  header:React.ReactElement,
  routesConfig:any
}

const LayoutContainer = (props:layoutContainerType) => {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { children,header,routesConfig } = props

  const onCollapse = (collapsed:boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {header}
      <Layout>
        <div className={collapsed?'layout-blank-hidden':'layout-blank'}>
        </div>

        <div className='layout-sider'>
          <Sider
           width={'20.8rem'}
           collapsedWidth="4.8rem"
           className='layout-sider-content'
           collapsible
           collapsed={collapsed}
           onCollapse={onCollapse}
          >
            <NavMenu routesConfig={routesConfig}/>
          </Sider>
        </div>

        <div className='layout-main-container'>

          <Layout className='breadcrumb-content'>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          </Layout>

          <div className='layout-main-content'>
            {children}
          </div>

          <Footer className='foot-centent'>xxx ©2021</Footer>
        </div>
      </Layout>
    </Layout>
  )
}

export default LayoutContainer;