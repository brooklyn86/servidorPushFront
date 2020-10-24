// import React from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Login from './pages/Login';
// import Home from './components';


// export default function Routes() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/home" exact component={Home} />
//         <Route path="/login" exact component={Login} />
//       </Switch>
//     </BrowserRouter>
//   );
// }
/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';
// import AuthGuard from 'src/components/Guard/AuthGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/pages/Error404View'))
  },
  {
    exact: true,
    // guard: GuestGuard,
    path: '/login',
    // component: lazy(() => import('./views/auth/LoginView'))
    component: lazy(() => import('./views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('./views/auth/LoginView'))
  },
  {
    exact: true,
    // guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('./views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('./views/auth/RegisterView'))
  },
  {
    path: '/app',
    // guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/reports/dashboard" />
      },

      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('./views/reports/DashboardView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
];

const renderRoutes = (routes) => (routes ? (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes
                      ? renderRoutes(route.routes)
                      : <Component {...props} />}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  </BrowserRouter>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
