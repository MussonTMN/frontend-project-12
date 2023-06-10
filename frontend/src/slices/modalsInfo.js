/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  selectedId: null,
};

const modalSlice = createSlice({
  name: 'modalsInfo',
  initialState,
  reducers: {
    showModal: ((state, action) => {
      const { type, selectedId } = action.payload;
      state.type = type;
      state.selectedId = selectedId;
    }),
    hideModal: ((state) => {
      state.type = null;
      state.selectedId = null;
    }),
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
