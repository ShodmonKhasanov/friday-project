import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Card from 'react-bootstrap/Card';

export default function AuthorInitiativesPage({ getLevelName }) {
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

  // Извлечение имени автора из первой инициативы в массиве
  const authorName =
    initiatives.length > 0 ? initiatives[0].User?.name : 'неизвестный автор';

  return (
    <Container className='d-flex flex-column justify-content-center'>
      <h2 className='mt-5'>Инициативы автора {authorName}</h2>
      {initiatives.map((initiative) => (
        <Link
          key={initiative.id}
          to={`/initiatives/${initiative.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Card
            style={{ width: '40rem', cursor: 'pointer' }}
            className='mb-2 mt-2'
            border='danger'
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)')
            }
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = 'none')}
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
                {getLevelName(initiative.initLevelId)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
}
