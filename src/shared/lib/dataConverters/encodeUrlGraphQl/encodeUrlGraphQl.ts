import { KeyValueGraphQl, SerachParams } from 'shared/types/graphQl';
import { decode64 } from '../decode64/decode64';

export const encodeUrlGraphQl = (
  url: string,
  body: string,
  searchParams: SerachParams | undefined
) => {
  const parsedUrl = decode64(decodeURIComponent(url));
  const {
    body: queryBody,
    variables: requestVariables,
  }: { body: string; variables: { key: string; value: string }[] } = JSON.parse(
    decode64(decodeURIComponent(body))
  );

  const requestHeaders: KeyValueGraphQl[] = [];

  if (searchParams) {
    for (const key in searchParams) {
      requestHeaders.push({
        key: key,
        value: decode64(decodeURIComponent(searchParams[key])),
      });
    }
  }

  const data = {
    url: parsedUrl,
    body: queryBody,
    requestHeaders,
    variables: requestVariables,
  };

  return data;
};
