import React from 'react';
import Moments from '../pages/moments/index';
import MomentsMgmt from '@/pages/moments-mgmt/index';
import Article from '../pages/article/index';
import ArticleMgmt from '@/pages/article-mgmt/index';
import Resume from '../pages/resume/index';
import NotFound from '../pages/not-found/index';
import SystemDept from '../pages/system-dept/index';
import {
	HashRouter,
	Routes,
	Route
} from 'react-router-dom';
import Header from '@/components/header';
import Layout from '@/layout/index';
import ProjectTemplate from '@/pages/smartData/views/projectTemplate';
import RecentlyViewed from '@/pages/smartData/views/recentlyViewed';
import ProjectSpace from '@/pages/smartData/views/projectSpace';
import {DataLayout} from '@/pages/smartData/layout';

const routesConfig = [
	{
		path: 'article',
		title: '发文章',
		element: <Article />,
		icon: 'FileMarkdownOutlined',
		children: []
	},
	{
		path: 'article-mgmt',
		title: '文章管理',
		element: <ArticleMgmt />,
		icon: 'ClockCircleOutlined'
	},
	{
		path: 'moments',
		title: '发动态',
		element: <Moments />,
		icon: 'ClockCircleOutlined'
	},
	{
		path: 'moments-mgmt',
		title: '动态管理',
		element: <MomentsMgmt />,
		icon: 'ClockCircleOutlined'
	},
	{
		path: 'resume',
		title: '个人管理',
		element: <Resume />,
		icon: 'UserOutlined'
	},
	{
		path: 'system/dept',
		title: '部门管理',
		element: <SystemDept />,
		icon: 'UserOutlined'
	},
	// 项目开始start
	{
		path: 'system/',
		title: '智能数据应用',
		// element: <SmartData />,
		icon: 'UserOutlined',
		children: [
			{
				path: 'projectSpace',
				title: '项目空间',
				element: <ProjectSpace />,
				icon: 'UserOutlined'
			},
			{
				path: 'projectTemplate',
				title: '模板项目',
				element: <ProjectTemplate />,
				// element: <SmartData />,
				icon: 'UserOutlined'
			},
			{
				path: 'recentlyViewed',
				title: '模板项目',
				element: <RecentlyViewed />,
				// element: <SmartData />,
				icon: 'UserOutlined'
			}
		]
	}
	// 项目开始end
];

const RoutesContainer = () => {
	const generateRoute = (routes: any) => {
		return routes.map((route: any) => {
			if (route.children !== undefined && route.children.length) {

				return (
					<Route key={route.path} path={route.path}>
						{generateRoute(route.children)}
						<Route index={true} element={route.element} />
					</Route>
				);
			}

			return <Route key={route.path} path={route.path} element={route.element} />;
		});
	};

	return (
		<HashRouter>
			<Layout routesConfig={routesConfig} header={<Header />}>
				<DataLayout>
					<Routes>
						<Route path='/'>
							{generateRoute(routesConfig)}
						</Route>
						{/* <Route index element={<Home />} /> */}
						<Route index={true} element={<Moments />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</DataLayout>
			</Layout>
		</HashRouter>
	);

};

export default RoutesContainer;
