import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import InitiativeCard from '../ui/initiativeCard';
import Container from 'react-bootstrap/Container';

export default function MeetupsPage({ user }) {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    axiosInstance('/initiatives').then((res) => {
      setMeetups(res.data);
      // console.log(res.data[0].User)
    });
  }, []);

  return (
    <>
      <Container className='d-flex flex-row justify-content-center'>
        {meetups.map((el) => (
          <InitiativeCard key={el.id} meetup={el} user={user} />
        ))}
      </Container>
    </>
  );
}
