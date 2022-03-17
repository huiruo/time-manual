import React from 'react';
import { DataLayout } from './layout';
import {
  Route,
  // HashRouter,
  Routes,
  // Route
} from 'react-router-dom';
import RecentlyViewed from './views/recentlyViewed';
import ProjectTemplate from './views/projectTemplate';
import ProjectSpace from './views/projectSpace';

const SmartData = () => {

  return (
    <DataLayout>
      <Routes>
        <Route path='/projectSpace' element={<ProjectSpace />} />
        <Route path='/projectTemplate' element={<ProjectTemplate />} />
        <Route path='/recentlyViewed' element={<RecentlyViewed />} />
      </Routes>
    </DataLayout>
  );

};

export default SmartData;
