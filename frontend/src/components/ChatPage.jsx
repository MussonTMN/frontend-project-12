import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { fetchData } from '../slices/channelsInfo.js';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchData();
      dispatch(response);
    };
    fetch();
  }, [dispatch]);

  return (
    <Container className="h-100 m-4 overwflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default ChatPage;
