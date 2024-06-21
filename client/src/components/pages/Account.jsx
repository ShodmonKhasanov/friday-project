import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axiosInstance from '../api/axiosInstance';

export default function Account({ user }) {
  const [initiatives, setInitiatives] = useState([]);

  useEffect(() => {
    axiosInstance(`/initiatives/user/${user.data.id}`)
      .then((res) => {
        setInitiatives(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.data.id]);

  return (
    <Row>
      <Col>
        <h2>Страница профиля: {user.data.name}</h2>
        <p>
          Почта: <a href={`mailto:${user.data.email}`}>{user.data.email}</a>
        </p>

        <h3>Мои инициативы</h3>
        {initiatives.length > 0 ? (
          initiatives.map((initiative) => (
            <Card
              key={initiative.id}
              style={{ width: '40rem' }}
              className='mb-2 mt-2'
              border='danger'
            >
              <Card.Body>
                <Card.Title>{initiative.title}</Card.Title>
                <Card.Text>{initiative.description}</Card.Text>
                <Card.Text>
                  <b>Количество проголосовавших: </b>
                  {initiative.votesCount}
                </Card.Text>
                <Card.Text>
                  <b>Процент голосов "ЗА": </b>
                  {initiative.percentFor}%
                </Card.Text>
                <Card.Text>
                  <b>Срок окончания голосования: </b>
                  {new Date(initiative.endDate).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  <b>Уровень инициативы: </b>
                  {initiative.initLevelId}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>У вас нет инициатив :с</p>
        )}
      </Col>
    </Row>
  );
}
