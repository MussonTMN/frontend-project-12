import { selectors as channelsSelectors } from './channelsInfo.js';
import { selectors as messagesSelectors } from './messagesInfo.js';

const { selectById } = channelsSelectors;

export const getChannels = (state) => channelsSelectors.selectAll(state);
export const getMessages = (state) => messagesSelectors.selectAll(state);
export const getCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
export const getCurrentChannel = (state) => selectById(state, getCurrentChannelId(state));
export const getModalType = (state) => state.modalsInfo.type;
export const getSelectedId = (state) => state.modalsInfo.selectedId;
