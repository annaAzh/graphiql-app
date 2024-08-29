import { HeadersItem, RestfulType } from 'shared/types/restful';
import { encode64 } from '../encode64/encode64';
import { checkIsValidJson } from 'shared/lib/utils';
import { BodyUrlType } from 'shared/types/app';

export const encodeRest = async (data: RestfulType) => {
  const { url, type, headers, body, variables } = data;

  const encodedUrl = encode64(url);
  let encodedHeaders: string | undefined = undefined;
  let formattedBody: BodyUrlType | undefined;

  const isValidBody = await checkIsValidJson(body);

  if (isValidBody && body) {
    formattedBody = { body };
  }

  if (variables) {
    const formattedVariables: HeadersItem[] = [];
    variables.forEach((variable) => {
      if (variable.key !== undefined && variable.value !== undefined) {
        formattedVariables.push(variable);
      }
    });
    formattedBody = { ...formattedBody, variables: formattedVariables };
  }

  if (headers) {
    encodedHeaders = '';
    headers.forEach((header, index) => {
      if (header.key !== undefined && header.value !== undefined) {
        if (index === 0) encodedHeaders += '?';
        else encodedHeaders += '&';

        encodedHeaders += `${header.key}=${encode64(header.value)}`;
      }
    });
  }

  const encodedBody = encode64(JSON.stringify(formattedBody));

  return encodedHeaders
    ? `/${type}/${encodedUrl}/${encodedBody}${encodedHeaders}`
    : `/${type}/${encodedUrl}/${encodedBody}`;
};
