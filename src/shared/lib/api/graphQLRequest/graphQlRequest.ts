import axios, { AxiosError, AxiosResponse } from 'axios';
import { GraphQlResponse, RequestGraphQLData } from 'shared/types/graphQl';

const fetchGraphQlData = async ({
  url,
  body: query,
  headers: requestHeaders,
  variables,
}: RequestGraphQLData): Promise<GraphQlResponse | undefined> => {
  try {
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

    const res: AxiosResponse<GraphQlResponse> = await axios.post(url, body, {
      headers,
    });

    return { status: res.status, data: res.data.data };
  } catch (e) {
    return e instanceof AxiosError && e && e.response
      ? { status: e.response.status, data: e.response.statusText }
      : undefined;
  }
};

export { fetchGraphQlData };
