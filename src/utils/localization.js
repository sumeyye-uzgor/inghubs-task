import {configureLocalization} from '@lit/localize';
import * as locales from '../generated/locales/generated-locales.js';

export const {getLocale, setLocale, updateWhenLocaleChanges} =
  configureLocalization({
    sourceLocale: 'en',
    targetLocales: ['tr'],
    loadLocale: async (locale) => locales.locales[locale](),
  });
