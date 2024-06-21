import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function OneInitiativePage({ user, getLevelName }) {
  const { id } = useParams();
  const [initiative, setInitiative] = useState({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check local storage if user has already voted for this initiative
    const hasVotedStorage = localStorage.getItem(`initiative_vote_${id}`);
    if (hasVotedStorage) {
      setHasVoted(true);
    }

    axiosInstance(`/initiatives/${id}`).then((res) => {
      console.log(res.data);
      setInitiative(res.data);
    });
  }, [id]);

  const handleVote = async (voteType) => {
    if (hasVoted) {
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/initiatives/${initiative.id}/vote`,
        {
          voteType,
        }
      );
      console.log('Vote updated:', response.data);
      setInitiative((prev) => ({
        ...prev,
        votesCount: response.data.votesCount,
        percentFor: response.data.percentFor,
      }));

      // Save vote in local storage
      localStorage.setItem(`initiative_vote_${id}`, voteType);
      setHasVoted(true);
    } catch (error) {
      console.error('Error voting:', error);
    }
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
          <Card.Text>
            <Link to={`/initiatives/author/${initiative.User?.id}`}>
              Все инициативы автора
            </Link>
          </Card.Text>
          <div>
            <Button
              onClick={() => handleVote('for')}
              variant='success'
              style={{ width: '100px', margin: '10px 10px' }}
              disabled={hasVoted}
            >
              За
            </Button>
            <Button
              onClick={() => handleVote('against')}
              variant='danger'
              style={{ width: '100px', margin: '10px 10px' }}
              disabled={hasVoted}
            >
              Против
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
