import React, { useMemo } from 'react';
import store from '../slices/index.js';
import { ApiContext } from './index.js';
import { actions as channelsActions } from '../slices/channelsInfo.js';
import { actions as messageActions } from '../slices/messagesInfo.js';

const api = (socket) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(messageActions.addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.deleteChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    console.log(payload);
    store.dispatch(channelsActions.renameChannel({
      id,
      changes: {
        name,
      },
    }));
  });

  const addMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
  });

  const addChannel = (name) => socket.emit('newChannel', { name }, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
  });

  const renameChannel = (channel) => socket.emit('renameChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
  });

  return {
    addMessage,
    addChannel,
    removeChannel,
    renameChannel,
  };
};

const ApiProvider = ({ socket, children }) => {
  const {
    addMessage, addChannel, removeChannel, renameChannel,
  } = api(socket);

  const providedData = useMemo(
    () => ({
      addMessage,
      addChannel,
      removeChannel,
      renameChannel,
    }),
    [addMessage, addChannel, removeChannel, renameChannel],
  );

  return (
    <ApiContext.Provider value={providedData}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
