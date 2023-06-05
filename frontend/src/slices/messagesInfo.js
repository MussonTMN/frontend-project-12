import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchData } from './channelsInfo.js';

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
      });
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
export const selectors = messagesStore.getSelectors((state) => state.messagesInfo);
