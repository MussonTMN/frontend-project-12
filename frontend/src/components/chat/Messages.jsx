import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { getMessages } from '../../slices/selectors.js';

const Messages = () => {
  const messages = useSelector(getMessages);
  console.log(messages);

  return (
    <Col className="p-0 h-100">
      <p>Chat</p>
    </Col>
  );
};

export default Messages;
