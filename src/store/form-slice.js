import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  errors: {
    firstName: true,
    lastName: true,
    dateOfBirth: true,
    dateOfEmployment: true,
    phone: true,
    email: true,
    position: true,
    department: true,
  },
  isFormValid: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFieldError: (state, action) => {
      const {fieldName, hasError} = action.payload;
      state.errors[fieldName] = hasError;
      state.isFormValid = !Object.values(state.errors).some(Boolean);
    },
    resetFormErrors: (state) => {
      state.errors = {
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        dateOfEmployment: true,
        phone: true,
        email: true,
        position: true,
        department: true,
      };
      state.isFormValid = false;
    },
  },
});

export const {setFieldError, resetFormErrors} = formSlice.actions;
export default formSlice.reducer;

export const selectFormValidity = (state) => state.form.isFormValid;
export const selectFormErrors = (state) => state.form.errors;
