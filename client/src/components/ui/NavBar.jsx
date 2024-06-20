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
        <Nav className='me-auto'>
          <NavLink to='/' className='nav-link'>
            Главная
          </NavLink>
          {user.data && (
            <NavLink to='/account' className='nav-link'>
              Профиль
            </NavLink>
          )}
          <Nav.Link href='#features'>Что-то ещё</Nav.Link>
          <NavLink to='/add' className='nav-link'>
            Добавить мероприятие
          </NavLink>
        </Nav>
        <Nav>
          {!user.data && (
            <>
              <NavLink to='/auth/signin' className='nav-link'>
                Войти
              </NavLink>
              <NavLink to='/auth/signup' className='nav-link'>
                Регистрация
              </NavLink>
              <span className='nav-link'>|</span>
            </>
          )}
          <span className='nav-link'>
            Привет, {user.data ? user.data.name : 'гость'}
          </span>
          {user.data && (
            <span className='nav-link'>
              <Button
                onClick={logoutHandler}
                variant='outline-danger'
                size='sm'
              >
                Выход
              </Button>
            </span>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
