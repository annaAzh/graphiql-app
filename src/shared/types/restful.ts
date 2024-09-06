interface RestfulType {
  url: string;
  method: ValidMethods;
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

type PartialRest = Partial<RestfulType>;

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
  type PartialRest,
};
