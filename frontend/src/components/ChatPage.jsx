import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../slices/channelsInfo.js';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';
import { getModalType, getStatus } from '../slices/selectors.js';
import getModal from './modals/index.js';
import { useAuth } from '../hooks/index.js';
import getRoute from '../routes.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchData());
    if (status === 'error') {
      auth.logOut();
      navigate(getRoute.loginPagePath());
    }
  });

  const type = useSelector(getModalType);

  const renderModal = (channelType) => {
    if (channelType === null) {
      return null;
    }
    const Modal = getModal(channelType);
    return <Modal />;
  };

  return (
    <Container className="h-100 m-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      {renderModal(type)}
    </Container>
  );
};

export default ChatPage;
