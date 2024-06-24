import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GoogleLoginButton from '../ui/GoogleLoginButton';

export default function SignInPage({ signInHandler, googleSignInHandler }) {
  const handleGoogleSuccess = (userObject) => {
    console.log('Юзер: ', userObject);
    googleSignInHandler(userObject);
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className='mt-5'>
        <h3 className='text-center'>Войти</h3>
        <Form onSubmit={signInHandler}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Введите почту'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Введите пароль'
            />
          </Form.Group>
          <Button variant='outline-primary' type='submit'>
            Подтвердить
          </Button>
        </Form>
        <div className='text-center mt-3'>
          Или:
          <GoogleLoginButton onSuccess={handleGoogleSuccess} />
        </div>
      </Col>
    </Row>
  );
}
