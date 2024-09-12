import { ResultResponse } from 'entities/Result';
import { RestfulType } from 'shared/types/restful';

const mockResponse: ResultResponse = {
  status: 200,
  body: 'Test body data',
};

const mockSaveResponse: RestfulType = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts',
  headers: [{ key: 'test', value: 'test' }],
  variables: [{ key: 'test', value: 'test' }],
  body: '{\n  "idc": 15\n}',
};

export { mockSaveResponse, mockResponse };
