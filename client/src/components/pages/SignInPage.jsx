import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SignInPage({ signInHandler }) {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (!formData.email) {
      setEmailError('Введите почту');
    } else {
      setEmailError('');
    }

    if (!formData.password) {
      setPasswordError('Введите пароль');
    } else {
      setPasswordError('');
    }

    if (formData.email && formData.password) {
      signInHandler(e, setEmailError, setPasswordError);
    }
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }} className="mt-5">
        <h3 className="text-center">Войти</h3>
        <Form onSubmit={handleSignIn}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Почта</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Введите почту"
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Введите пароль"
              isInvalid={!!passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="outline-primary" type="submit">
            Подтвердить
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
