import axios, { AxiosResponse } from 'axios';
import { GraphQlResponse, RequestGraphQLData } from 'shared/types/graphQl';

const fetchGraphQlData = async ({
  baseUrl,
  query,
  requestHeaders,
  variables,
}: RequestGraphQLData): Promise<GraphQlResponse | undefined> => {
  const url = baseUrl;
  const headersObject: Record<string, string> = {};

  if (requestHeaders) {
    requestHeaders.forEach(({ key, value }) => {
      if (key && value) {
        headersObject[key] = value;
      }
    });
  }

  const variablesObject: { [key: string]: string } = {};
  if (variables) {
    variables.forEach(({ key, value }) => {
      if (key && value) {
        variablesObject[key] = value;
      }
    });
  }

  const body = {
    query,
    variables: variablesObject,
  };

  const headers = {
    ...headersObject,
    'Content-Type': 'application/json',
  };

  console.log(body, headers);

  const res: AxiosResponse<GraphQlResponse> = await axios.post(url, body, {
    headers,
  });

  return { status: res.status, data: res.data };
};

export { fetchGraphQlData };
