import { StoreProvider } from 'core';
import { render } from '@testing-library/react';
import GraphQlPage from 'app/GRAPHQL/[...graphReq]/page';
import { encode64 } from 'shared/lib/dataConverters';

import { mockResponse } from 'shared/__mock__';
import { fetchGraphQlData } from 'shared/lib/api';
import {
  DEFAULT_QUERY_GRAPHQL_EXAMPLE,
  DEFAULT_URL_GRAPHQL_EXAMPLE,
} from 'shared/constants';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value }: { value: string }) => (
      <div data-testid="codeMirror">{value}</div>
    ),
  };
});

vi.mock('shared/lib/api', () => ({
  fetchGraphQlData: vi.fn(),
}));
vi.mocked(fetchGraphQlData).mockResolvedValue(mockResponse);

const url = encode64(DEFAULT_URL_GRAPHQL_EXAMPLE);
const body = encode64(DEFAULT_QUERY_GRAPHQL_EXAMPLE);

describe('testing GraphQl page', () => {
  it('fetchGraphQlData should not be called', async () => {
    render(
      <StoreProvider>
        {await GraphQlPage({
          params: { graphReq: ['', ''] },
        })}
      </StoreProvider>
    );

    expect(fetchGraphQlData).not.toHaveBeenCalled();
  });

  it('fetchGraphQlData should not called', async () => {
    try {
      await GraphQlPage({
        params: { graphReq: [url, body] },
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
