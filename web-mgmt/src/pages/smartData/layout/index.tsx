import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import '../views/smart-data.scss';

interface LayoutPorps {
  children: React.ReactElement,
}

const childRouter: string[] = [
  '/system/projectSpace',
  '/system/projectTemplate',
  '/system/recentlyViewed'
];

export const DataLayout: FC<LayoutPorps> = (props) => {
  const { children } = props;
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  return (
    <Layout className='smart-layout-cantainer'>
      {childRouter.find((v) => v === pathname) ? <Menu
        style={{ width: 256 }}
        selectedKeys={selectedKeys}
        defaultOpenKeys={['sub1']}
        mode={'vertical'}
        theme={'light'}
        className='smart-child-menu'
      >
        <Menu.Item key='/system/projectSpace' icon={<MailOutlined />}>
          <Link to={'/system/projectSpace'}>项目空间</Link>
        </Menu.Item>
        <Menu.Item key='/system/projectTemplate' icon={<CalendarOutlined />}>
          <Link to={'/system/projectTemplate'}>模板项目</Link>
        </Menu.Item>
        <Menu.Item key='/system/recentlyViewed' icon={<CalendarOutlined />}>
          <Link to={'/system/recentlyViewed'}>最近查看</Link>
        </Menu.Item>
      </Menu> : null}
      <div style={{ flex: 8 }}>
        {children}
      </div>
    </Layout>
  );
};
