import React from 'react';
// import Home from '../pages/home/index';
import Moments from '../pages/moments/index';
import Article from '../pages/article/index';
import ArticleTest1 from '../pages/article-test1/index';
import ArticleTest2 from '../pages/article-test2/index';
import Resume from '../pages/resume/index';
import NotFound from '../pages/not-found/index';
import {
	HashRouter,
  Routes,
  Route
} from "react-router-dom";
// import PrivateRoute from './private-route'
import Header from '@/components/header'
import Layout from '@/layout/index'

const routesConfig = [
	{
		path: 'article',
		title:'文章管理',
		element: <Article />,
		icon:'FileMarkdownOutlined',
		children:[
			// {
			// 	path: 'articleTest1',
			// 	url: 'article/articleTest1',
			// 	title:'测试子集1',
			// 	element: <ArticleTest1 />,
			// },
			// {
			// 	path: 'articleTest2',
			// 	url: 'article/articleTest2',
			// 	title:'测试子集2',
			// 	element: <ArticleTest2 />,
			// },
		]
	},
	{
		path: 'moments',
		title:'动态管理',
		element: <Moments />,
		icon:'ClockCircleOutlined'
	},
	{
		path: 'resume',
		title:'个人管理',
		element: <Resume />,
		icon:'UserOutlined'
	}
]

const RoutesContainer = () => {
	const generateRoute = (routes:any)=>{
		return routes.map((route:any)=>{
			if (route.children!==undefined && route.children.length) {
				return ( 
					<Route key={route.path} path={route.path}>
						{generateRoute(route.children)}
						<Route index element={route.element} />
					</Route>
				)
			}

			return <Route key={route.path} path={route.path} element={route.element} />
		})
	}

	return (
		<HashRouter>
			<Layout routesConfig={routesConfig} header={<Header />}>
				<Routes>
					<Route path="/">
						{ generateRoute(routesConfig) }
					</Route>
					{/* <Route index element={<Home />} /> */}
					<Route index element={<Moments />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</HashRouter>
	)
};

export default RoutesContainer;