import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Card from 'react-bootstrap/Card';

export default function AuthorInitiativesPage() {
  const { id } = useParams();
  const [initiatives, setInitiatives] = useState([]);

  useEffect(() => {
    axiosInstance(`/initiatives/user/${id}`)
      .then((res) => {
        console.log(res.data); // Логирование полученных данных
        setInitiatives(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <Container className='d-flex flex-column justify-content-center'>
      <h2 className='mt-5'>Инициативы автора</h2>
      {initiatives.map((initiative) => (
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
      ))}
    </Container>
  );
}
