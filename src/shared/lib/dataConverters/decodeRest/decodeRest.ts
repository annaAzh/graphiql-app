import { HeadersItem, StringObject } from 'shared/types/restful';
import { decode64 } from '../decode64/decode64';
import { BodyUrlType } from 'shared/types/app';

interface DecodeRestProps {
  requestedUrl: string;
  requestedHeaders?: StringObject;
  requestedBody?: string;
}

export const decodeRest = async (data: DecodeRestProps) => {
  const { requestedUrl, requestedBody, requestedHeaders } = data;
  const url = decode64(requestedUrl);
  let headers: StringObject | undefined;
  let body: string | undefined;
  let variables: Required<HeadersItem>[] | undefined;

  if (requestedHeaders) {
    const keys = Object.keys(requestedHeaders);
    const values = Object.values(requestedHeaders);

    if (keys.length && values.length) {
      keys.forEach((key) => {
        const value = decodeURIComponent(requestedHeaders[key]);
        headers = { ...headers, [key]: value };
      });
    }
  }

  if (requestedBody) {
    const encodedBody: BodyUrlType = JSON.parse(decode64(requestedBody));
    if (encodedBody.body) {
      body = encodedBody.body;
    }
    if (encodedBody.variables) {
      encodedBody.variables.forEach((variable) => {
        if (!variable.key || !variable.value) return;
        const requiredVariable: Required<HeadersItem> = {
          key: variable.key,
          value: variable.value,
        };
        variables = variables
          ? [...variables, requiredVariable]
          : [requiredVariable];
      });
    }
  }

  return { url, body, headers, variables };
};
