import { ResultResponse } from 'entities/Result';
import { DEFAULT_URL_EXAMPLE } from 'shared/constants';
import { RestfulType } from 'shared/types/restful';

const mockResponse: ResultResponse = {
  status: 200,
  body: 'Test body data',
};

const mockSaveResponse: Required<RestfulType> = {
  method: 'GET',
  url: DEFAULT_URL_EXAMPLE,
  headers: [{ key: 'Content-Type', value: 'application/json' }],
  variables: [{ key: 'foo', value: '123' }],
  body: '{\n  "title": "{{foo}} ",\n  "body": "test"\n}',
};

export { mockSaveResponse, mockResponse };
