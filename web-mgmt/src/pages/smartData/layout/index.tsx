import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

interface LayoutPorps {
  children: React.ReactElement,
}

export const DataLayout: FC<LayoutPorps> = (props) => {
  const { children } = props;

  return (
    <Layout>
      <div>
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={'vertical'}
          theme={'light'}
        >
          <Menu.Item key='1' icon={<MailOutlined />}>
            <Link to={'/system/projectSpace'}>项目空间</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<CalendarOutlined />}>
            <Link to={'/system/projectTemplate'}>模板项目</Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<CalendarOutlined />}>
            <Link to={'/system/recentlyViewed'}>最近查看</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        {children}
      </div>
    </Layout>
  );

};
