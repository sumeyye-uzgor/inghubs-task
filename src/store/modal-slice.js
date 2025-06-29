import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  isConfirmModal: true,
  title: '',
  description: '',
  payload: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      Object.assign(state, {
        ...initialState,
        opened: true,
        ...action.payload,
      });
    },
    closeModal: (state) => {
      state.opened = false;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;

export const selectModalState = (state) => state.modal;
