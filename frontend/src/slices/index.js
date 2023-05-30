import { configureStore } from '@reduxjs/toolkit';

import channelsInfo from './channelsInfo.js';
import messagesInfo from './messagesInfo.js';

export default configureStore({
  reducer: {
    channelsInfo,
    messagesInfo,
  },
});
