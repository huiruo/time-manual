import React from 'react';
// import Home from '../pages/home/index';
import Moments from '../pages/moments/index';
import Article from '../pages/article/index';
import ArticleTest1 from '../pages/article-test1/index';
import ArticleTest2 from '../pages/article-test2/index';
import Resume from '../pages/resume/index';
import NotFound from '../pages/not-found/index';
import { HashRouter, Routes, Route } from 'react-router-dom';

const routesConfig = [
  {
    path: 'article',
    element: <Article />,
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
  },
  {
    path: 'resume',
    element: <Resume />,
  },
];

const RoutesContainer = () => {

  const generateRoute = (routes: any) => {

    return routes.map((route: any) => {

      if (route.children !== undefined && route.children.length) {

        return (
          <Route key={route.path} path={route.path}>
            {generateRoute(route.children)}
            <Route index element={route.element} />
          </Route>
        );

      }

      return (
        <Route key={route.path} path={route.path} element={route.element} />
      );

    });

  };

  return (
    <HashRouter>
      <Routes>
        <Route path='/'>{generateRoute(routesConfig)}</Route>
        <Route index element={<Article />} />
        {/* <Route index element={<Moments />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </HashRouter>
  );

};

export default RoutesContainer;
