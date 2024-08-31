import * as yup from 'yup';
import { VALID_METHODS } from './global';
import { ValidMethods } from 'shared/types/restful';

export const restSchema = yup.object().shape({
  url: yup.string().required('url is required'),
  type: yup
    .mixed<ValidMethods>()
    .required('type is required')
    .test('type', 'type must be valid', (value) =>
      VALID_METHODS.includes(value)
    ),
  headers: yup.array().of(
    yup.object().shape({
      key: yup.string(),
      value: yup.string(),
    })
  ),
  body: yup.string(),
  variables: yup.array().of(
    yup.object().shape({
      key: yup.string(),
      value: yup.string(),
    })
  ),
});
