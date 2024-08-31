export type RequestGraphQLData = {
  baseUrl: string;
  query?: string;
  variables?: KeyValueGraphQl[];
  requestHeaders?: KeyValueGraphQl[];
  operationName?: string;
};

export type KeyValueGraphQl = {
  key?: string;
  value?: string;
};

export type IntrospectionQueryRequest = {
  operationName: string;
  query: string;
};

export type GraphQlResponse = {
  status: number;
  data?: Record<string, unknown>;
};
