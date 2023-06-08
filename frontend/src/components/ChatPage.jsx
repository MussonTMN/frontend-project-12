import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { fetchData } from '../slices/channelsInfo.js';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';
import { getModalType } from '../slices/selectors.js';
import getModal from './modals/index.js';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const type = useSelector(getModalType);

  return (
    <Container className="h-100 m-4 overwflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      {getModal(type)}
    </Container>
  );
};

export default ChatPage;
