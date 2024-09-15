import { describe, expect, it } from 'vitest';
import { encodeGraphql } from './encodeQraphQl';
import { encode64 } from '../encode64/encode64';
import { encodeBody } from '../encodeBody/encodeBody';
import { encodeHeaders } from '../encodeHeaders/encodeHeaders';

const mockData = {
  url: 'url',
  headers: [{ key: 'test header', value: 'test header value' }],
  body: 'body',
  variables: [{ key: 'name', value: 'Rick' }],
};

describe('test encodeQraphQl function', () => {
  it('expect recived data equal encoded data', () => {
    const { url, headers, body, variables } = mockData;
    const result = encodeGraphql(mockData);
    const encodedUrl = encode64(decodeURIComponent(url));
    const encodedBody = encodeBody({ body, variables });
    const encodedHeaders = encodeHeaders(headers);

    expect(result).toBe(
      `/GRAPHQL/${encodedUrl}/${encodedBody}/${encodedHeaders}`
    );
  });
});
