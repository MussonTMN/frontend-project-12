import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import ApiProvider from './contexts/ApiProvider';

import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index.js';
import { actions as channelsActions } from './slices/channelsInfo.js';
import { actions as messageActions } from './slices/messagesInfo.js';

const init = async () => {
  const i18n = i18next.createInstance();
  const socket = io();

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

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <ApiProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ApiProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
