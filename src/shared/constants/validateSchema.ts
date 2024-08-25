import * as yup from 'yup';

const name = yup.string().required('Name is required');

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
  .matches(/[a-zа-я]/, 'at least one lowercase letter')
  .matches(/[A-ZА-Я]/, 'at least one uppercase letter')
  .matches(/[0-9]/, 'at least one number')
  .matches(/[!&@%~#^*]/, 'at least one special character')
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
