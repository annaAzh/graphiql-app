import { act, fireEvent, render, screen } from '@testing-library/react';
import { GraphQlPlayground } from './GraphQlPlayground';
import { DEFAULT_URL_GRAPHQL_EXAMPLE } from 'shared/constants';
import { StoreProvider } from 'core';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';
import { IntrospectionObjectType, IntrospectionQuery } from 'graphql';
import { fetchSDLSchema } from 'shared/lib/api/graphQLRequest/graphQlShema';

vi.mock('shared/lib/storeState/storeState', () => ({
  setLocalStoreState: vi.fn(),
}));

vi.mock('shared/lib/dataConverters/encodeGraphQl/encodeQraphQl', () => ({
  encodeGraphql: vi.fn(),
}));

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value }: { value: string }) => (
      <div data-testid="codeMirror">{value}</div>
    ),
  };
});

vi.mock('shared/lib/api/graphQLRequest/graphQlShema', () => ({
  fetchSDLSchema: vi.fn(),
}));

describe('GraphQlPlayground form submission', () => {
  it('should call setLocalStoreState', async () => {
    render(
      <StoreProvider>
        <GraphQlPlayground />
      </StoreProvider>
    );

    fireEvent.change(screen.getByTestId(/graphql-url/i), {
      target: { value: DEFAULT_URL_GRAPHQL_EXAMPLE },
    });

    await act(async () => fireEvent.submit(screen.getByTestId('graphql-form')));

    expect(setLocalStoreState).toHaveBeenCalled();
  });

  it('should successfully fetch and set schema', async () => {
    const mockSchema: IntrospectionQuery = {
      __schema: {
        queryType: {
          kind: 'OBJECT',
          name: 'Query',
          ofType: null,
          fields: [],
          interfaces: [],
          possibleTypes: [],
        } as IntrospectionObjectType,
        mutationType: null,
        subscriptionType: null,
        types: [],
        directives: [],
      },
    };
    (fetchSDLSchema as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: 200,
      data: mockSchema,
    });

    render(
      <StoreProvider>
        <GraphQlPlayground />
      </StoreProvider>
    );

    const docs_button = screen.getByText(/docs/i);
    expect(docs_button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(docs_button);
    });

    expect(screen.getByTestId('docs-drawer')).toBeInTheDocument();
  });

  it('should not render docs on error schema', async () => {
    (fetchSDLSchema as ReturnType<typeof vi.fn>).mockResolvedValue({
      status: 404,
      data: 'error',
    });

    render(
      <StoreProvider>
        <GraphQlPlayground />
      </StoreProvider>
    );

    const docs_button = screen.getByText(/docs/i);
    expect(docs_button).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(docs_button);
    });

    expect(screen.queryByTestId('docs-drawer')).not.toBeInTheDocument();
  });
});
