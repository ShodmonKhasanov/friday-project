import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import Account from './components/pages/Account';
import ProtectedRouter from './components/HOCs/ProtectedRouter';
import useUser from './components/hooks/useUser';
import AddInitiativePage from './components/pages/AddInitiativePage';
import OneInitiativePage from './components/pages/OneInitiativePage';
import AuthorInitiativesPage from './components/pages/AuthorInitiativesPage';

export default function App() {
  const { logoutHandler, signInHandler, signUpHandler, user, getLevelName } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <MainPage user={user} />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRouter
              isAllowd={user.status === 'logged'}
              redirect='/auth/signin'
            >
              <Account user={user} />
            </ProtectedRouter>
          ),
        },
        {
          element: <ProtectedRouter isAllowd={user.status !== 'logged'} />,
          children: [
            {
              path: '/auth/signup',
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: '/auth/signin',
              element: <SignInPage signInHandler={signInHandler} />,
            },
          ],
        },
        {
          path: '/add',
          element: (
            <ProtectedRouter isAllowd={!!user} redirect='/login'>
              <AddInitiativePage user={user} />
            </ProtectedRouter>
          ),
        },
        {
          path: '/initiatives/:id',
          element: (
            <OneInitiativePage user={user} getLevelName={getLevelName} />
          ),
        },
        {
          path: '/initiatives/author/:id',
          element: <AuthorInitiativesPage getLevelName={getLevelName} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}