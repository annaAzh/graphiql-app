import axios, { AxiosError, AxiosResponse } from 'axios';
import { VALID_METHODS } from 'shared/constants';
import { RestResponse, StringObject, ValidMethods } from 'shared/types/restful';
import { decodeRest } from 'shared/lib/dataConverters';

export const getData = async (
  type: ValidMethods,
  requestedUrl: string,
  requestedHeaders?: StringObject,
  requestedBody?: string
): Promise<RestResponse | undefined> => {
  try {
    if (!VALID_METHODS.includes(type)) return;

    const { url, headers, variables, ...rest } = decodeRest({
      requestedUrl,
      requestedBody,
      requestedHeaders,
    });

    let body = rest.body;
    variables?.forEach((variable) => {
      body = { ...body, [variable.key]: variable.value };
    });

    let res: AxiosResponse | undefined;

    switch (type) {
      case 'GET':
        res = await axios.get(url, headers);
        break;
      case 'POST':
        res = await axios.post(url, body, headers);
        break;
      case 'PUT':
        res = await axios.put(url, body, headers);
        break;
      case 'PATCH':
        res = await axios.patch(url, body, headers);
        break;
      case 'DELETE':
        res = await axios.delete(url);
        break;
      case 'HEAD':
        res = await axios.head(url, headers);
        break;
      case 'OPTIONS':
        res = await axios.options(url, headers);
        break;
      default:
        res = undefined;
    }

    return res
      ? { status: res.status, body: JSON.stringify(res.data, null, 2) }
      : undefined;
  } catch (e) {
    return e instanceof AxiosError && e && e.response
      ? { status: e.response.status, body: e.response.statusText }
      : undefined;
  }
};
