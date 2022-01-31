import React,{ FC, useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom'
import { Menu } from 'antd';
import {
  FileMarkdownOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FileOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

interface menuItemType{
  path:string
  url?:string
  title?:string
  children?:any[]
  element:React.ReactElement,
  icon?:string
}

interface navMenu{
  routesConfig:menuItemType[]
}

const NavMenu: FC<navMenu> = ({routesConfig}) => {

  const [selectedKeys,setSelectedKeys] = useState<string[]>([])
  const { pathname } = useLocation()

  const renderIcon = (iconName:string|undefined)=>{
    switch (iconName) {
      case 'FileMarkdownOutlined':
        return <FileMarkdownOutlined />
      case 'ClockCircleOutlined':
        return <ClockCircleOutlined />
      case 'UserOutlined':
        return <UserOutlined />
      default:
        return <FileOutlined />
    }
  }

  useEffect(()=>{
    setSelectedKeys([pathname])
  },[pathname])

  const traverseRouteTree = (routeTree:menuItemType[]) => {
    return routeTree.map((item, index) => {
      const path = item.path

      if (item.children !== undefined && item.children.length) {
        return (
          <SubMenu title={item.title} key={index + item.path}>
            {traverseRouteTree(item.children)}
          </SubMenu>
        )
      }

      return (
        <Menu.Item title={item.title} key={'/'+item.path} icon={renderIcon(item.icon)}>
          <Link to={item.url?item.url:path}>{item.title}</Link>
        </Menu.Item>
      )
    })
  }

  return(
			<Menu 
        style={{marginTop:'3.6rem'}}
        theme="dark"
        selectedKeys={selectedKeys}
        mode="inline"
      >
        {traverseRouteTree(routesConfig)}
      </Menu>
  )
}

export default NavMenu;