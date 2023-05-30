import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthHeader from '../utils/getAuthHeader';
import routes from '../routes';

const fetchData = createAsyncThunk(
  'fetchData',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannelId: null },
  reducers: {
    setActualChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannelId = payload.currentChannelId;
      });
  },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;
export { fetchData };
