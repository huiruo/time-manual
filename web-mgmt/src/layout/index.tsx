import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import NavMenu from '@/layout/navMenu'
import './index.scss'

const { Content, Footer, Sider } = Layout;

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
          <Sider width={'20.8rem'} className='layout-sider-content' collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <NavMenu routesConfig={routesConfig}/>
          </Sider>
        </div>

        <div className='layout-content'>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
          </Layout>
          <Content
            style={{
              padding: 10,
              margin: 0,
              minHeight: 280,
              width:'100%',
              background:'grey'
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>xxx ©2021</Footer>
        </div>
      </Layout>
    </Layout>
  )
}

export default LayoutContainer;