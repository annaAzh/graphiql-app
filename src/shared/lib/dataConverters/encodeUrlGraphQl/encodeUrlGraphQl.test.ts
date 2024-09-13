import { describe, it, expect, vi } from 'vitest';
import { encodeUrlGraphQl } from './encodeUrlGraphQl';
import { decode64 } from '../decode64/decode64';
import { mockRequestGraphQLData, mockUrl } from 'shared/__mock__';

vi.mock('../decode64/decode64', () => ({
  decode64: vi.fn((str: string) => str),
}));

describe('encodeUrlGraphQl', () => {
  it('should correctly encode and parse the URL, body, and headersParams', () => {
    const url = encodeURIComponent(mockUrl);
    const body = encodeURIComponent(
      JSON.stringify({
        body: 'query { getHeroes { name } }',
        variables: [{ key: 'name', value: 'Rick' }],
      })
    );
    const searchParams = {
      'test-headers': encodeURIComponent(decode64('test-value')),
    };

    const expected = {
      url: mockRequestGraphQLData.url,
      body: mockRequestGraphQLData.body,
      requestHeaders: mockRequestGraphQLData.headers,
      variables: mockRequestGraphQLData.variables,
    };

    const result = encodeUrlGraphQl(url, body, searchParams);

    expect(result).toEqual(expected);
  });
});
