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
import AuthGuard from './components/Guard/AuthGuard';
import GuestGuard from './components/Guard/GuestGuard';
const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/app" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/pages/Error404View'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('./views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
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
    guard: AuthGuard,
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
        exact: true,
        path: '/app/keys',
        component: lazy(() => import('./views/lists'))
      },
      {
        exact: true,
        path: '/app/users',
        component: lazy(() => import('./views/listUsers'))
      },
      {
        exact: true,
        path: '/app/key/:key',
        component: lazy(() => import('./views/extra/forms/FormikView'))
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('./views/pages/AccountView'))
      },
      {
        exact: true,
        path: '/app/create/user',
        component: lazy(() => import('./views/createUser'))
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
