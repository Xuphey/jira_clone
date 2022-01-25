import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';

const AppRoutes = () => (
  <Router history={history}>
    <Routes>
      <Route path="/" element={<Navigate exact to="/project" />} />
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="/project/*" element={<Project />} />
      <Route element={<PageError />} />
    </Routes>
  </Router>
);

export default AppRoutes;
