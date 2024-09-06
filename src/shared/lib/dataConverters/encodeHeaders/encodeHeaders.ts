import { HeadersItem } from 'shared/types/restful';
import { encode64 } from '../encode64/encode64';

export const encodeHeaders = (headers: HeadersItem[]) => {
  let encodedHeaders: string | undefined;

  encodedHeaders = '';
  headers.forEach((header, index) => {
    if (header.key !== undefined) {
      if (index === 0) encodedHeaders += '?';
      else encodedHeaders += '&';

      encodedHeaders += `${header.key}=${encode64(header.value)}`;
    }
  });

  return encodedHeaders;
};
