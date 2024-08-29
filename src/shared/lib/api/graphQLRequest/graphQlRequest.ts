import axios, { AxiosResponse } from 'axios';
import {
  GraphQlResponse,
  KeyValueGraphQl,
  RequestGraphQLData,
} from 'shared/types/graphQl';

const fetchGraphQlData = async ({
  baseUrl,
  query,
  requestHeaders,
  variables,
}: RequestGraphQLData): Promise<GraphQlResponse | undefined> => {
  const url = baseUrl;
  const headersObject: KeyValueGraphQl = {};
  if (requestHeaders) {
    requestHeaders.forEach(({ key, value }) => {
      headersObject[key] = value;
    });
  }

  const body = {
    query,
    variables: variables || {},
  };

  const headers = {
    ...headersObject,
    'Content-Type': 'application/json',
  };

  const res: AxiosResponse<GraphQlResponse> = await axios.post(url, body, {
    headers,
  });

  return { status: res.status, data: res.data };
};

export { fetchGraphQlData };
