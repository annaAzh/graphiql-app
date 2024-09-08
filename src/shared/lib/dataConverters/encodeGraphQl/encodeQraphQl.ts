import { Path } from 'shared/types/path';
import { encode64 } from '../encode64/encode64';
import { encodeBody } from '../encodeBody/encodeBody';
import { encodeHeaders } from '../encodeHeaders/encodeHeaders';
import { RequestGraphQLData } from 'shared/types/graphQl';

export const encodeGraphql = (data: Partial<RequestGraphQLData>) => {
  const {
    baseUrl: url,
    requestHeaders: headers,
    query: body,
    variables,
  } = data;

  const encodedUrl = url ? encode64(url) : undefined;
  let encodedHeaders: string | undefined;
  if (headers) encodedHeaders = encodeHeaders(headers);
  const encodedBody: string | undefined = encodeBody({
    body,
    variables,
  });

  let path = `/${Path.GRAPH}`;

  if (encodedUrl) path += `/${encodedUrl}`;
  if (encodedBody) path += `/${encodedBody}`;
  if (encodedHeaders) path += `/${encodedHeaders}`;
  return path;
};
