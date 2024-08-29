interface RestfulType {
  url: string;
  type: ValidMethods;
  headers?: HeadersItem[];
  body?: string;
  variables?: HeadersItem[];
}

interface HeadersItem {
  key?: string;
  value?: string;
}

type ValidMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

type RestfulMethods = ValidMethods | 'REST';

interface RestResponse {
  status: number;
  body: string;
}

interface StringObject {
  [key: string]: string;
}

export {
  type RestfulType,
  type HeadersItem,
  type ValidMethods,
  type RestResponse,
  type StringObject,
  type RestfulMethods,
};
