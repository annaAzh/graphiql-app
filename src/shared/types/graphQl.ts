import { IntrospectionQuery } from 'graphql';

export type RequestGraphQLData = {
  url: string;
  body?: string;
  variables?: KeyValueGraphQl[];
  headers?: KeyValueGraphQl[];
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
  status: number | string;
  data?: IntrospectionQuery | string;
};

export type PartialGraphQL = Partial<RequestGraphQLData>;

export type HeadersParams = { [key: string]: string };
