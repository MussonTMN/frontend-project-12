/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../contexts/AuthProvider';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const defaultId = 1;
const channelsStore = createEntityAdapter();
const initialState = channelsStore.getInitialState({
  currentChannelId: defaultId,
  channels: [],
});

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel: channelsStore.addOne,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    deleteChannel: (state, { payload }) => {
      const { id } = payload;
      channelsStore.removeOne(state, id);
      if (id === state.currentChannelId) {
        state.currentChannelId = defaultId;
      }
    },
    renameChannel: channelsStore.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        channelsStore.setAll(state, payload.channels);
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;
export { fetchData };
export const selectors = channelsStore.getSelectors((state) => state.channelsInfo);
