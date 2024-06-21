import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import axiosInstance from '../api/axiosInstance';
import InitiativeCard from '../ui/initiativeCard';
import { StyledRow } from '../styled/StyledRow';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styled/StyledMainpage.css'

export default function MainPage() {
  const [initiatives, setInitiatives] = useState([]);
  const [filterType, setFilterType] = useState(null);
  const [filterLevel, setFilterLevel] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);

  useEffect(() => {
    axiosInstance.get('/initiatives').then((res) => setInitiatives(res.data));
  }, []);

  const toggleFilterType = (type) => {
    setFilterType((prevType) => (prevType === type ? null : type));
  };

  const toggleFilterLevel = (level) => {
    setFilterLevel((prevLevel) => (prevLevel === level ? null : level));
  };

  const toggleFilterStatus = (status) => {
    setFilterStatus((prevStatus) => (prevStatus === status ? null : status));
  };

  const filterInitiatives = () => {
    return initiatives.filter((initiative) => {
      const matchesType = filterType
        ? initiative.initiativeTypeId === filterType
        : true;
      const matchesLevel = filterLevel
        ? initiative.initLevelId === filterLevel
        : true;
      const matchesStatus = filterStatus
        ? filterStatus === 'completed'
          ? new Date(initiative.endDate) < new Date()
          : new Date(initiative.endDate) >= new Date()
        : true;
      return matchesType && matchesLevel && matchesStatus;
    });
  };

  return (
    <>
      <Container className="sticky-filter">
        <Form className="checkbox-row">
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="type-medicine"
              label="Тип инициативы: Медицина"
              onClick={() => toggleFilterType(1)}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="type-transport"
              label="Тип инициативы: Транспорт"
              onClick={() => toggleFilterType(2)}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="type-improvement"
              label="Тип инициативы: Благоустройство"
              onClick={() => toggleFilterType(3)}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="level-federal"
              label="Уровень инициативы: Федеральный"
              onClick={() => toggleFilterLevel(1)}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="level-regional"
              label="Уровень инициативы: Региональный"
              onClick={() => toggleFilterLevel(2)}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="level-municipal"
              label="Уровень инициативы: Муниципальный"
              onClick={() => toggleFilterLevel(3)}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="status-completed"
              label="Инициатива истекла"
              onClick={() => toggleFilterStatus('completed')}
            />
          </div>
          <div className="form-check">
            <Form.Check
              type="checkbox"
              id="status-ongoing"
              label="Инициатива активна"
              onClick={() => toggleFilterStatus('ongoing')}
            />
          </div>
        </Form>
      </Container>

      <Container className="text-center">
        <StyledRow className="mt-3">
          {filterInitiatives().map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </StyledRow>
      </Container>
    </>
  );
}
