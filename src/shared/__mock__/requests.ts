export const mockUrl = 'https://mock-url.com/graphql';

export const mockRequestGraphQLData = {
  url: mockUrl,
  body: `query { getHeroes { name } }`,
  headers: [{ key: 'test-headers', value: 'test-value' }],
  variables: [{ key: 'name', value: 'Rick' }],
};
