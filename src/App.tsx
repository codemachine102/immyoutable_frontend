import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

//styles
import 'react-toastify/dist/ReactToastify.css';
import './scss/style.scss';
//constants
import {
  publicRoutes,
  privateRoutes,
  authRoutes,
  generalRoutes,
  publicAuthRoutes,
} from './constants';
//layouts
import {
  AuthLayout,
  OnboardingLayout,
  ProfileLayout,
  GeneralLayout,
} from './layouts';

function App() {
  return (
    <>
      <Helmet>
        <title>Immyoutable</title>
      </Helmet>
      <Routes>
        <Route element={<OnboardingLayout />}>
          {publicRoutes.map((route) => (
            <Route
              path={route.name}
              element={route.component}
              key={route.name}
            />
          ))}
        </Route>

        <Route element={<ProfileLayout />}>
          {privateRoutes.map((route) => (
            <Route
              path={route.name}
              element={route.component}
              key={route.name}
            />
          ))}
        </Route>

        <Route element={<GeneralLayout />}>
          {generalRoutes.map((route) => (
            <Route
              path={route.name}
              element={route.component}
              key={route.name}
            />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {authRoutes.map((route) => (
            <Route
              path={route.name}
              element={route.component}
              key={route.name}
            />
          ))}
        </Route>

        <Route element={<AuthLayout check={false} />}>
          {publicAuthRoutes.map((route) => (
            <Route
              path={route.name}
              element={route.component}
              key={route.name}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
