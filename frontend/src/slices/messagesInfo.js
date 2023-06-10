/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData, actions as channelsActions } from './channelsInfo.js';

const messagesStore = createEntityAdapter();
const initialState = messagesStore.getInitialState({
  messages: [],
});

const messageSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: messagesStore.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(channelsActions.deleteChannel, (state, { payload }) => {
        const { id } = payload;
        const filteredMessages = state.messages.filter((message) => message.channelId === id);
        messagesStore.removeMany(state, filteredMessages);
      });
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
export const selectors = messagesStore.getSelectors((state) => state.messagesInfo);
