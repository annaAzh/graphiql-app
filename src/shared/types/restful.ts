interface RestfulType {
  url?: string;
  type?: string;
  headers?: HeadersItem[];
  body?: string;
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

interface RestResponse {
  status: number;
  body: string;
}

export {
  type RestfulType,
  type HeadersItem,
  type ValidMethods,
  type RestResponse,
};
