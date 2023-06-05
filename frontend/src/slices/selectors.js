import { selectors as channelsSelectors } from './channelsInfo.js';
import { selectors as messagesSelectors } from './messagesInfo.js';

export const getChannels = (state) => channelsSelectors.selectAll(state);
export const getMessages = (state) => messagesSelectors.selectAll(state);
