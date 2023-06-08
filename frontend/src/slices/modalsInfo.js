import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
};

const modalSlice = createSlice({
  name: 'modalsInfo',
  initialState,
  reducers: {
    showModal: ((state, action) => {
      const { type } = action;
      state.type = type;
    }),
    hideModal: ((state) => {
      state.type = null;
    }),
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
