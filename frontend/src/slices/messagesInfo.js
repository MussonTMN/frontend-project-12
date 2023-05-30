import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './channelsInfo.js';

const messageSlice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    addMessage(state, { payload }) {
      state.messages.push(payload);
    },
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
