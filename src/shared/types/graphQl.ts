import { IntrospectionQuery } from 'graphql';

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

export type GraphQlSchemaResponse = {
  data: IntrospectionQuery;
};

export type GraphQlResponse = {
  status: number;
  data?: IntrospectionQuery;
};
