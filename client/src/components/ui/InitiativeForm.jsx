import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

export default function InitiativeForm({ submitHandler }) {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    votesCount: 0,
    percentFor: 0,
    endDate: '',
    initiativeTypeId: '',
    initLevelId: '',
  });

  const changeHandler = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Form onSubmit={(e) => submitHandler(e, inputs)}>
      <Row>
        <Col>
          <Form.Group controlId='formTitle'>
            <Form.Label>Название</Form.Label>
            <Form.Control
              name='title'
              type='text'
              placeholder='Введите название'
              value={inputs.title}
              onChange={changeHandler}
              isInvalid={inputs.title.length === 0}
              isValid={inputs.title.length > 0}
            />
            <Form.Control.Feedback type='invalid'>
              Введите название
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='formDescription'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name='description'
              as='textarea'
              placeholder='Введите описание'
              value={inputs.description}
              onChange={changeHandler}
              isInvalid={inputs.description.length === 0}
              isValid={inputs.description.length > 0}
            />
            <Form.Control.Feedback type='invalid'>
              Введите описание
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId='formEndDate'>
            <Form.Label>Дата окончания</Form.Label>
            <Form.Control
              name='endDate'
              type='date'
              value={inputs.endDate}
              onChange={changeHandler}
              isInvalid={inputs.endDate.length === 0}
              isValid={inputs.endDate.length > 0}
            />
            <Form.Control.Feedback type='invalid'>
              Введите дату окончания
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='formInitiativeType'>
            <Form.Label>Тип инициативы</Form.Label>
            <Form.Control
              name='initiativeTypeId'
              as='select'
              value={inputs.initiativeTypeId}
              onChange={changeHandler}
              isInvalid={inputs.initiativeTypeId.length === 0}
              isValid={inputs.initiativeTypeId.length > 0}
            >
              <option value=''>Выберите тип</option>
              <option value='1'>Медицина</option>
              <option value='2'>Транспорт</option>
              <option value='3'>Благоустройство</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Выберите тип инициативы
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId='formInitLevel'>
            <Form.Label>Уровень инициативы</Form.Label>
            <Form.Control
              name='initLevelId'
              as='select'
              value={inputs.initLevelId}
              onChange={changeHandler}
              isInvalid={inputs.initLevelId.length === 0}
              isValid={inputs.initLevelId.length > 0}
            >
              <option value=''>Выберите уровень</option>
              <option value='1'>Федеральный</option>
              <option value='2'>Региональный</option>
              <option value='3'>Муниципальный</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              Выберите уровень инициативы
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Button variant='primary' type='submit' className='mt-3'>
        Сохранить
      </Button>
    </Form>
  );
}
