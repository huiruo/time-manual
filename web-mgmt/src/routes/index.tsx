import React from 'react';
import Moments from '../pages/moments/index';
import MomentsMgmt from '@/pages/moments-mgmt/index';
import Article from '../pages/article/index';
import ArticleMgmt from '@/pages/article-mgmt/index';
import Resume from '../pages/resume/index';
import NotFound from '../pages/not-found/index';
import {
	HashRouter,
	Routes,
	Route
} from 'react-router-dom';
import Header from '@/components/header';
import Layout from '@/layout/index';

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
	}
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
				<Routes>
					<Route path='/'>
						{generateRoute(routesConfig)}
					</Route>
					{/* <Route index element={<Home />} /> */}
					<Route index={true} element={<Moments />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Layout>
		</HashRouter>
	);

};

export default RoutesContainer;
