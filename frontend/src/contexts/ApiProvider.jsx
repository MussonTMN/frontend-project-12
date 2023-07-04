import React, { useMemo } from 'react';
import { ApiContext } from './index.js';
import { actions as channelsActions } from '../slices/channelsInfo.js';
import store from '../slices/index.js';

const api = (socket) => {
  const addMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
  });

  const addChannel = (name, resolve) => socket.emit('newChannel', { name }, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
    const { id } = response.data;
    store.dispatch(channelsActions.setCurrentChannel(id));
    resolve();
  });

  const removeChannel = (id, resolve) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
    resolve();
  });

  const renameChannel = (channel, resolve) => socket.emit('renameChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    }
    resolve();
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
