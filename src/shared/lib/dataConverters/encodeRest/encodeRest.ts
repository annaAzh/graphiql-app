import { RestfulType } from 'shared/types/restful';
import { encode64 } from '../encode64/encode64';
import { encodeBody } from '../encodeBody/encodeBody';
import { encodeHeaders } from '../encodeHeaders/encodeHeaders';

export const encodeRest = (data: Partial<RestfulType>) => {
  const { url, method, headers, body, variables } = data;

  const encodedUrl = url ? encode64(url) : undefined;
  let encodedHeaders: string | undefined;
  if (headers) encodedHeaders = encodeHeaders(headers);
  const encodedBody: string | undefined = encodeBody({
    body,
    variables,
  });

  let path = '';
  if (method) path += `/${method}`;
  if (encodedUrl) path += `/${encodedUrl}`;
  if (encodedBody) path += `/${encodedBody}`;
  if (encodedHeaders) path += `/${encodedHeaders}`;

  return path;
};
