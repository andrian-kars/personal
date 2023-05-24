import messagesEn from './en';
import messagesUa from './ua';

export const LOCALES = {
  UKRAINIAN: 'uk-UA',
  ENGLISH: 'en-US',
};

export const messages = {
  [LOCALES.UKRAINIAN]: messagesUa,
  [LOCALES.ENGLISH]: messagesEn,
};
