import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Card from 'react-bootstrap/Card';

export default function OneInitiativePage({ user }) {
  const { id } = useParams();
  const [initiative, setInitiative] = useState({});

  useEffect(() => {
    axiosInstance(`/initiatives/${id}`).then((res) => setInitiative(res.data));
  }, [id]);

  const calculatePercentage = (votesFor, totalVotes) => {
    return totalVotes > 0 ? ((votesFor / totalVotes) * 100).toFixed(2) : 0;
  };

  return (
    <Container className='d-flex flex-column justify-content-center '>
      <Card style={{ width: '40rem' }} className='mb-2 mt-5' border='danger'>
        <Card.Body>
          <Card.Title>{initiative.title}</Card.Title>
          <Card.Text>{initiative.description}</Card.Text>
          <Card.Text>
            <b>Автор: </b>
            <i>{initiative.User?.name}</i>
          </Card.Text>
          <Card.Text>
            <b>Количество проголосовавших: </b>
            {initiative.totalVotes}
          </Card.Text>
          <Card.Text>
            <b>Процент голосов "ЗА": </b>
            {calculatePercentage(initiative.votesFor, initiative.totalVotes)}%
          </Card.Text>
          <Card.Text>
            <b>Срок окончания голосования: </b>
            {new Date(initiative.endDate).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <b>Уровень инициативы: </b>
            {initiative.level}
          </Card.Text>
          <Card.Text>
            <Link to={`/initiatives/author/${initiative.User?.id}`}>
              Все инициативы автора
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}