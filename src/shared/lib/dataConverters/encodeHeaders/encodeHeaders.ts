import { HeadersItem } from 'shared/types/restful';

export const encodeHeaders = (headers: HeadersItem[]) => {
  let encodedHeaders: string | undefined;

  encodedHeaders = '';
  headers.forEach((header, index) => {
    if (header.key !== undefined) {
      if (index === 0) encodedHeaders += '?';
      else encodedHeaders += '&';

      encodedHeaders += `${header.key}=${encodeURIComponent(header.value || '')}`;
    }
  });

  return encodedHeaders;
};
