import React from 'react';
import InitiativeForm from '../ui/InitiativeForm';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function AddInitiativePage({ user }) {
  const navigate = useNavigate();

  const submitHandler = async (e, inputs) => {
    e.preventDefault();
    console.log(inputs);
    await axiosInstance.post('/initiatives/add', inputs);
    navigate('/');
  };

  return (
    <Container className='mt-5'>
      <h2>Добавить инициативу</h2>
      <InitiativeForm submitHandler={submitHandler} user={user} />
    </Container>
  );
}
