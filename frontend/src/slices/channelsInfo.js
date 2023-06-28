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
  status: 'await',
  currentChannelId: defaultId,
  channels: [],
});

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsStore.addOne(state, payload);
      state.currentChannelId = payload.id;
    },
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
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions } = channelSlice;
export default channelSlice.reducer;
export const selectors = channelsStore.getSelectors((state) => state.channelsInfo);
export { fetchData };
