import axios, { AxiosResponse } from 'axios';
import { decode64 } from '../../dataConverters/decode64/decode64';
import { VALID_METHODS } from 'shared/constants';
import { RestResponse, ValidMethods } from 'shared/types/restful';

export const getData = async (
  type: ValidMethods,
  url: string,
  requestedHeaders?: { [key: string]: string },
  requestedBody?: string
): Promise<RestResponse | undefined> => {
  if (!VALID_METHODS.includes(type)) return;

  const currentUrl = decodeURIComponent(url);
  const encodedUrl = decode64(currentUrl);
  let headers: { [key: string]: string } | undefined = undefined;
  let body: string | undefined = undefined;
  let res: AxiosResponse | undefined;

  if (requestedHeaders) {
    const keys = Object.keys(requestedHeaders);
    const values = Object.values(requestedHeaders);

    if (keys.length && values.length) {
      keys.forEach((key) => {
        const value = decode64(requestedHeaders[key]);
        headers = { ...headers, [key]: value };
      });
    }
  }

  if (requestedBody) body = decode64(requestedBody);

  switch (type) {
    case 'GET':
      res = await axios.get(encodedUrl, headers);
      break;
    case 'POST':
      res = await axios.post(encodedUrl, body, headers);
      break;
    case 'PUT':
      res = await axios.put(encodedUrl, body, headers);
      break;
    case 'PATCH':
      res = await axios.patch(encodedUrl, body, headers);
      break;
    case 'DELETE':
      res = await axios.delete(encodedUrl);
      break;
    case 'HEAD':
      res = await axios.head(encodedUrl, headers);
      break;
    case 'OPTIONS':
      res = await axios.options(encodedUrl, headers);
      break;
    default:
      res = undefined;
  }

  return res
    ? { status: res.status, body: JSON.stringify(res.data, null, 2) }
    : undefined;
};
