import React, { useMemo } from 'react';
import store from '../slices/index.js';
import { ApiContext } from './index.js';
import { actions as channelsActions } from '../slices/channelsInfo.js';
import { actions as messageActions } from '../slices/messagesInfo.js';

const api = (socket) => {
  const addMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    } else {
      socket.on('newMessage', (payload) => {
        store.dispatch(messageActions.addMessage(payload));
      });
    }
  });

  const addChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    } else {
      socket.on('newChannel', (payload) => {
        store.dispatch(channelsActions.addChannel(payload));
      });
    }
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    } else {
      socket.on('removeChannel', (payload) => {
        store.dispatch(channelsActions.deleteChannel(payload));
      });
    }
  });

  const renameChannel = (channel) => socket.emit('renameChannel', channel, (response) => {
    if (response.status !== 'ok') {
      console.error(response);
    } else {
      socket.on('renameChannel', (payload) => {
        console.log(response);
        store.dispatch(channelsActions.renameChannel(payload));
      });
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
