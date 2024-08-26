import * as yup from 'yup';

const name = yup
  .string()
  .required('Name is required')
  .matches(/\p{L}/u, 'only letters are allowed');

const email = yup
  .string()
  .required('Email is required')
  .matches(
    /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
    'add a valid email (e.g. daizy@gmail.com)'
  )
  .email();

const password = yup
  .string()
  .required('Password is required')
  .matches(/\p{Ll}/u, 'at least one lowercase letter')
  .matches(/\p{Lu}/u, 'at least one uppercase letter')
  .matches(/[0-9]/, 'at least one number')
  .matches(
    /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/,
    'at least one special character'
  )
  .min(8, 'length must be at least 8 characters');

export const schemaLogin = yup.object().shape({
  email,
  password,
});

export const schemaRegister = yup.object().shape({
  name,
  email,
  password,
});
