import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from './employee-slice';
import languageReducer from './language-slice';
import modalReducer from './modal-slice';
import formReducer from './form-slice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    language: languageReducer,
    modal: modalReducer,
    form: formReducer,
  },
});
