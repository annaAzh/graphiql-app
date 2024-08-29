import { HeadersItem, StringObject } from 'shared/types/restful';
import { decode64 } from '../decode64/decode64';
import { BodyUrlType } from 'shared/types/app';

interface DecodeRestProps {
  requestedUrl: string;
  requestedHeaders?: StringObject;
  requestedBody?: string;
}

export const decodeRest = (data: DecodeRestProps) => {
  const { requestedUrl, requestedBody, requestedHeaders } = data;
  const url = decode64(requestedUrl);
  let headers: StringObject | undefined;
  let body: StringObject | undefined = undefined;
  let variables: HeadersItem[] | undefined;

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

  if (requestedBody) {
    const encodedBody: BodyUrlType = JSON.parse(decode64(requestedBody));
    if (encodedBody.body) body = { ...JSON.parse(encodedBody.body) };
    if (encodedBody.variables) {
      encodedBody.variables.forEach((variable) => {
        if (!variable.key || !variable.value) return;
        variables = variables ? [...variables, variable] : [variable];
      });
    }
  }

  return { url, body, headers, variables };
};
