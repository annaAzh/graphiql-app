interface RestfulType {
  url?: string;
  type?: string;
  headers?: KeyAndValueItem[];
  body?: string;
}

interface KeyAndValueItem {
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
  type KeyAndValueItem,
  type ValidMethods,
  type RestResponse,
};
