/* eslint-disable react/prop-types */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { StyledCard } from '../styled/StyledCard';
import axiosInstance from '../api/axiosInstance';
import Dropdown from 'react-bootstrap/Dropdown';

export default function InitiativeCard({ initiative }) {
  const handleVote = async (voteType) => {
    try {
      const response = await axiosInstance.put(
        `/initiatives/${initiative.id}/vote`,
        {
          voteType,
        }
      );
      console.log('Vote updated:', response.data);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  return (
    <Col md={4} className="mt-2 position-relative">
      <Card style={{ minHeight: '500px', maxHeight: '500px' }}>
        <StyledCard>
          <h3 className="p-2">{initiative.title}</h3>
          <p className="p-2">{initiative.description}</p>
          <span>Голосов всего отдано: {initiative.votesCount}</span>
          <span>Общий процент голосов за: {initiative.percentFor}%</span>
          <span>
            Дата окончания инициативы:{' '}
            {new Date(initiative.endDate).toLocaleDateString()}
          </span>
          <div className="d-flex flex-row justify-content-end gap-4">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Раскрыть
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Подробнее</Dropdown.Item>
                <Dropdown.Item
                  variant="danger"
                  onClick={() => handleVote('for')}
                  href="#/action-2"
                >
                  Отдать Голос За
                </Dropdown.Item>
                <Dropdown.Item
                  variant="success"
                  onClick={() => handleVote('against')}
                  href="#/action-3"
                >
                  Проголосовать против
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </StyledCard>
      </Card>
    </Col>
  );
}
