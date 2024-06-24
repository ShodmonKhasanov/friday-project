import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const fullNameRegex = /^[A-Za-zА-Яа-яЁё]+ [A-Za-zА-Яа-яЁё]+ [A-Za-zА-Яа-яЁё]+$/;

export default function SignUpPage({ signUpHandler }) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    let isValid = true;

    if (!fullNameRegex.test(formData.name)) {
      setNameError(`Введите данные в формате "Иванов Иван Иванович".`);
      isValid = false;
    } else {
      setNameError('');
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError(
        'Неверный формат почты! Введите почту в формате: example@yandex.ru'
      );
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        'Пароль должен содержать хотя бы одну цифру, одну букву и быть не менее 6 символов'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      signUpHandler(e);
    }
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className='mt-5'>
        <h3 className='text-center'>Регистрация</h3>
        <Form onSubmit={handleSignUp}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Полное имя</Form.Label>
            <Form.Control
              name='name'
              type='text'
              placeholder='Введите Ф.И.О'
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type='invalid'>
              {nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Введите почту'
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type='invalid'>
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Введите пароль'
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type='invalid'>
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant='outline-primary' type='submit'>
            Подтвердить
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
