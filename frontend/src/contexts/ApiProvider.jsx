import React, { useMemo } from 'react';
import { ApiContext } from './index.js';

const api = (socket) => {
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
