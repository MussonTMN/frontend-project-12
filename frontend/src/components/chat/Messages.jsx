import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Col, Form, Button, InputGroup,
} from 'react-bootstrap';
import * as yup from 'yup';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { getCurrentChannel, getCurrentChannelId, getMessages } from '../../slices/selectors.js';
import { useApi, useAuth } from '../../hooks/index.js';

const filter = require('leo-profanity');

filter.add(filter.getDictionary('ru'));

const Messages = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { user } = useAuth();
  const chatApi = useApi();
  const currentChannelId = useSelector(getCurrentChannelId);
  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getMessages)
    .filter((message) => message.channelId === currentChannelId);

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(),
  });
  // console.log(messages);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const { body } = values;
      const { username } = user;
      const channelId = currentChannelId;
      const cleanedBody = filter.clean(body);
      const data = {
        body: cleanedBody,
        channelId,
        username,
      };
      chatApi.addMessage(data);
      formik.resetForm();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    const messagesBox = document.getElementById('messages-box');
    const lowScroll = messagesBox.scrollHeight;
    messagesBox.scrollTop = lowScroll;
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${currentChannel?.name}`}</b>
          </p>
          <span className="text-muted">
            {t('chat.counter.key', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn('text-break', 'mb-2', {
                'text-end': user.username === message.username,
              })}
            >
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
          >
            <InputGroup>
              <Form.Control
                onChange={formik.handleChange}
                name="body"
                placeholder={t('chat.putMessage')}
                className="border-0 p-0 ps-2 has-validation"
                aria-label={t('chat.newMessage')}
                value={formik.values.body}
                ref={inputRef}
                disabled={formik.isSubmitting}
                autoComplete="off"
              />
              <Button
                style={{ border: 'none' }}
                type="submit"
                variant="group-vertical"
                disabled={!formik.values.body}
              >
                <ArrowRightSquare />
                <span className="visually-hidden">{t('chat.send')}</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </Col>
  );
};

export default Messages;
