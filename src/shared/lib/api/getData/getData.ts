import axios, { AxiosError, AxiosResponse } from 'axios';
import { VALID_METHODS } from 'shared/constants';
import { StringObject, ValidMethods } from 'shared/types/restful';
import { decodeRest } from 'shared/lib/dataConverters';
import { checkIsValidJson } from 'shared/lib/utils';
import { ResultResponse } from 'entities/Result';

export const getData = async (
  type: ValidMethods,
  requestedUrl: string,
  requestedHeaders?: StringObject,
  requestedBody?: string
): Promise<ResultResponse | undefined> => {
  try {
    if (!VALID_METHODS.includes(type)) return;

    const {
      url,
      headers,
      variables,
      body: decodedBody,
    } = await decodeRest({
      requestedUrl,
      requestedBody,
      requestedHeaders,
    });

    let body: string | StringObject | undefined;
    let formattedBody: StringObject | undefined;

    const isValid = await checkIsValidJson(decodedBody?.trim());
    if (decodedBody) {
      if (isValid) formattedBody = JSON.parse(decodedBody);
      else body = decodedBody;
    }

    if (variables && formattedBody) {
      const values = Object.values(formattedBody);
      const keys = Object.keys(formattedBody);

      values.forEach((item, index) => {
        const current = typeof item === 'string' ? item.trim() : item;
        if (
          current[0] === '{' &&
          current[1] === '{' &&
          current[current.length - 1] === '}' &&
          current[current.length - 2] === '}'
        ) {
          const key = current.replaceAll('{', '').replaceAll('}', '');
          variables.forEach((variable) => {
            if (variable.key.trim() === key) {
              formattedBody = {
                ...formattedBody,
                [keys[index]]: variable.value,
              };
            }
          });
        }
      });
    }

    body = formattedBody;

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
      : e instanceof Error
        ? { status: e.name, body: e.message }
        : undefined;
  }
};
