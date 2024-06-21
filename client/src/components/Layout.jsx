import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from './ui/NavBar';
import Loader from './HOCs/Loader';

export default function Layout({ user, logoutHandler }) {
  return (
    <> 
        <Loader showSpinner={user.status === 'fetching'}>
            <NavBar user={user} logoutHandler={logoutHandler} />
          <Container>
            <Outlet />
          </Container>
        </Loader> 
    </>
  );
}
