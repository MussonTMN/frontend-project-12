import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import ApiProvider from './contexts/ApiProvider';

import App from './components/App';
import resources from './locales/index.js';
import store from './slices/index.js';

const init = async (socket) => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
    <Provider store={store}>
      <ApiProvider socket={socket}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ApiProvider>
    </Provider>
  );
};

export default init;
