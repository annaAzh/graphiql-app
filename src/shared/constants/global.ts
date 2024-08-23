import { ValidMethods } from 'shared/types/restful';

const VALID_METHODS: ValidMethods[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
  'HEAD',
  'OPTIONS',
];

const DEFAULT_URL_EXAMPLE = 'https://jsonplaceholder.typicode.com/posts';

export { VALID_METHODS, DEFAULT_URL_EXAMPLE };
