import { TFunction } from 'i18next';
import * as yup from 'yup';

const name = (t: TFunction) => {
  return yup
    .string()
    .required(t('NameRequired'))
    .matches(/\p{L}/u, t('NameTerms'));
};

const email = (t: TFunction) => {
  return yup
    .string()
    .required(t('EmailRequired'))
    .matches(/[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/, t('EmailTerms'))
    .email();
};

function password(t: TFunction) {
  return yup
    .string()
    .required(t('PasswordRequired'))
    .matches(/\p{Ll}/u, t('Lowercase'))
    .matches(/\p{Lu}/u, t('Uppercase'))
    .matches(/[0-9]/, t('NumberPassword'))
    .matches(
      /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/,
      t('SpecialCharacterPassword')
    )
    .min(8, t('lengthPassword'));
}

export const schemaLogin = (t: TFunction) => {
  return yup.object().shape({
    email: email(t),
    password: password(t),
  });
};

export const schemaRegister = (t: TFunction) => {
  return yup.object().shape({
    name: name(t),
    email: email(t),
    password: password(t),
  });
};
