/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { StyledCard } from '../styled/StyledCard';
import axiosInstance from '../api/axiosInstance';
import Button from 'react-bootstrap/esm/Button';

export default function InitiativeCard({ initiative }) {
  const [votes, setVotes] = useState(initiative.votesCount);
  const [userVote, setUserVote] = useState(null);
  const navigate = useNavigate();
  const [isInitiativeExpired, setIsInitiativeExpired] = useState(false);
  const [initiativeStatus, setInitiativeStatus] = useState('');

  useEffect(() => {
    // проверка с локал стореджа
    const storedVote = localStorage.getItem(`initiative_vote_${initiative.id}`);
    if (storedVote) {
      setUserVote(storedVote);
    }

    // проверка статуса инициативы
    const currentDate = new Date();
    const endDate = new Date(initiative.endDate);
    setIsInitiativeExpired(currentDate > endDate);

    // проверка результата голосования
    if (isInitiativeExpired) {
      if (initiative.percentFor < 50) {
        setInitiativeStatus('Инициатива не принята');
      } else {
        setInitiativeStatus('Инициатива принята');
      }
    }
  }, [initiative.id, initiative.endDate, initiative.percentFor, isInitiativeExpired]);

  const handleVote = async (voteType) => {
    if (userVote) {
      alert('Вы уже голосовали за эту инициативу!');
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
      setVotes((prev) => prev + 1);
      localStorage.setItem(`initiative_vote_${initiative.id}`, voteType);
      setUserVote(voteType);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleDetailClick = () => {
    navigate(`/initiatives/${initiative.id}`);
  };

  return (
    <Col md={4} className='mt-2 position-relative'>
      <Card style={{ minHeight: '500px', maxHeight: '500px' }}>
        <StyledCard>
          <h3 className='p-2'>{initiative.title}</h3>
          <p className='p-2'>{initiative.description}</p>
          <span>Голосов всего отдано: {votes}</span>
          <span>Общий процент голосов за: {initiative.percentFor}%</span>
          <span>
            Дата окончания инициативы:{' '}
            {new Date(initiative.endDate).toLocaleDateString()}
          </span>
          {isInitiativeExpired && (
            <span className={`p-2 ${initiative.percentFor < 50 ? 'text-danger' : 'text-success'}`}>
              {initiativeStatus}
            </span>
          )}
          <div className='d-flex flex-row justify-content-end gap-4 mt-2'>
            <Button
              variant='outline-primary'
              type='submit'
              onClick={handleDetailClick}
            >
              Подробнее
            </Button>
          </div>
          {!isInitiativeExpired && (
            <div>
              <Button
                onClick={() => handleVote('for')}
                variant='success'
                style={{ width: '100px', margin: '10px 10px' }}
                disabled={userVote}
              >
                За
              </Button>
              <Button
                onClick={() => handleVote('against')}
                variant='danger'
                style={{ width: '100px', margin: '10px 10px' }}
                disabled={userVote}
              >
                Против
              </Button>
            </div>
          )}
        </StyledCard>
      </Card>
    </Col>
  );
}
