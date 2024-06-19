import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './ui/NavBar';
import Loader from './HOCs/Loader';

export default function Layout({ user, logoutHandler }) {
  return (
    <>
      <div style={{ backgroundColor: 'grey', height: '100vh' }}>
        <Loader showSpinner={user.status === 'fetching'}>
          <Container>
            <NavBar user={user} logoutHandler={logoutHandler} />
            <Outlet />
          </Container>
        </Loader>
      </div>
    </>
  );
}
