import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axiosInstance from '../api/axiosInstance';
import InitiativeCard from '../ui/initiativeCard';
import { StyledRow } from "../styled/StyledRow";

export default function MainPage() {
  const [initiatives, setInitiatives] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [filterLevel, setFilterLevel] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    axiosInstance.get("/initiatives").then((res) => setInitiatives(res.data));
  }, []);

  const toggleFilterType = (type) => {
    setFilterType(prevType => (prevType === type ? null : type));
  };

  const toggleFilterLevel = (level) => {
    setFilterLevel(prevLevel => (prevLevel === level ? null : level));
  };

  const toggleFilterStatus = (status) => {
    setFilterStatus(prevStatus => (prevStatus === status ? null : status));
  };

  const filterInitiatives = () => {
    return initiatives.filter(initiative => {
      const matchesType = filterType ? initiative.initiativeTypeId === filterType : true;
      const matchesLevel = filterLevel ? initiative.initLevelId === filterLevel : true;
      const matchesStatus = filterStatus ? (
        filterStatus === 'completed' ? new Date(initiative.endDate) < new Date() : new Date(initiative.endDate) >= new Date()
      ) : true;
      return matchesType && matchesLevel && matchesStatus;
    });
  };

  return (
    <>
      <Container className="text-center">
        <ButtonGroup className="mb-3">
          <Button variant="primary" onClick={() => toggleFilterType(1)}>Медицина</Button>
          <Button variant="primary" onClick={() => toggleFilterType(2)}>Транспорт</Button>
          <Button variant="primary" onClick={() => toggleFilterType(3)}>Благоустройство</Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3">
          <Button variant="secondary" onClick={() => toggleFilterLevel(1)}>Федеральный</Button>
          <Button variant="secondary" onClick={() => toggleFilterLevel(2)}>Региональный</Button>
          <Button variant="secondary" onClick={() => toggleFilterLevel(3)}>Муниципальный</Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3">
          <Button variant="danger" onClick={() => toggleFilterStatus('completed')}>Завершенные</Button>
          <Button variant="success" onClick={() => toggleFilterStatus('ongoing')}>Активные</Button>
        </ButtonGroup>
        <StyledRow className="mt-3">
          {filterInitiatives().map((initiative) => (
            <InitiativeCard 
              key={initiative.id}
              initiative={initiative}
            />
          ))}
        </StyledRow>
      </Container>
    </>
  );
}
