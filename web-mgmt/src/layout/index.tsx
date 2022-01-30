import React, { useState } from 'react';
import { Layout, Breadcrumb } from 'antd';
import NavMenu from '@/layout/navMenu'

const { Content, Footer, Sider } = Layout;

const LayoutContainer = (props:any) => {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { children,header } = props

  console.log('layout----props---->-======', props)

  const onCollapse = (collapsed:boolean) => {
    console.log('collapsed:', collapsed);
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {header}
      <Layout>
        <Sider width={200} collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <NavMenu />
        </Sider>

        <div style={{width:'100%',height:'auto'}}>
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