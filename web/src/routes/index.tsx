import React from 'react';
// import Home from '../pages/home/index';
import Moments from '../pages/moments/index';
import Article from '../pages/article/index';
import Login from '../pages/login';
import ArticleTest1 from '../pages/article-test1/index';
import ArticleTest2 from '../pages/article-test2/index';
import Resume from '../pages/resume/index';
import NotFound from '../pages/not-found/index';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './authRoute';

interface IRoute {
  path: string,
  element: React.ReactNode,
  auth: boolean,
  children: any
}

const routesConfig = [
  {
    path: 'article',
    element: <Article />,
    auth: true,
    children: [
      {
        path: 'articleTest1',
        element: <ArticleTest1 />,
      },
      {
        path: 'articleTest2',
        element: <ArticleTest2 />,
      },
    ],
  },
  {
    path: 'moments',
    element: <Moments />,
    auth: true
  },
  {
    path: 'resume',
    element: <Resume />,
    auth: true
  },
  {
    path: 'login',
    element: <Login />,
    auth: false
  },
];

const RoutesContainer = () => {
  console.log('===RoutesRender===');

  const generateRoute = (routes: any) => {
    return routes.map((route: IRoute) => {
      if (route.children !== undefined && route.children.length) {
        const element = route.auth ? <AuthRoute>{route.element}</AuthRoute> : route.element;

        return (
          <Route key={route.path} path={route.path}>
            {generateRoute(route.children)}
            <Route index={true} element={element} />
          </Route>
        );
      }

      const element = route.auth ? <AuthRoute>{route.element}</AuthRoute> : route.element;

      return (
        <Route key={route.path} path={route.path} element={element} />
      );
    });
  };

  return (
    <HashRouter>
      <Routes>
        <Route path='/'>{generateRoute(routesConfig)}</Route>
        <Route index={true} element={<AuthRoute><Article /></AuthRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  );

};

export default RoutesContainer;
