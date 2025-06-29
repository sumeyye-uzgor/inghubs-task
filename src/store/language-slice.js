import {createSlice} from '@reduxjs/toolkit';

const initialState =
  localStorage.getItem('lang') ||
  (navigator.language.startsWith('tr') ? 'tr' : 'en');

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      const lang = action.payload;
      localStorage.setItem('lang', lang);
      import('../utils/localization.js').then(({setLocale}) => setLocale(lang));
      return lang;
    },
  },
});

export const {changeLanguage} = languageSlice.actions;
export default languageSlice.reducer;
