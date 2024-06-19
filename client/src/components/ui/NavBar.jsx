import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBar({ user, logoutHandler }) {
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand href='/'>Лого</Navbar.Brand>
        <Nav className='me-auto'>
          <NavLink to='/' className='nav-link'>
            Домой
          </NavLink>
          {user.data && (
            <NavLink to='/account' className='nav-link'>
              Акк
            </NavLink>
          )}
          <Nav.Link href='#features'>Что-то ещё</Nav.Link>
          <Nav.Link href='#pricing'>Что-то ещё</Nav.Link>
        </Nav>
        <Nav>
          {!user.data && (
            <>
              <NavLink to='/auth/signin' className='nav-link'>
                Зайти в хату!
              </NavLink>
              <NavLink to='/auth/signup' className='nav-link'>
                Зарегайся!
              </NavLink>
              <span className='nav-link'>|</span>
            </>
          )}
          <span className='nav-link'>
            Привет, {user.data ? user.data.name : 'странник'}
          </span>
          {user.data && (
            <span className='nav-link'>
              <Button
                onClick={logoutHandler}
                variant='outline-danger'
                size='sm'
              >
                Выход там!
              </Button>
            </span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
