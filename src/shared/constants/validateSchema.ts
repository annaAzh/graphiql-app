import * as yup from 'yup';

export const schema = yup.object().shape({
  email: yup.string().required('Email is required').email(),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[a-zа-я]/, 'at least one lowercase letter')
    .matches(/[A-ZА-Я]/, 'at least one uppercase letter')
    .matches(/[0-9]/, 'at least one number')
    .matches(/[!&@%~#^*]/, 'at least one special character')
    .min(8, 'password length must be at least 8 characters'),
});
