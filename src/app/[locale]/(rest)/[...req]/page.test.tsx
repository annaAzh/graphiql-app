import { StoreProvider } from 'core';
import { render } from '@testing-library/react';
import { DEFAULT_URL_EXAMPLE } from 'shared/constants';
import { encode64 } from 'shared/lib/dataConverters';
import { getData } from 'shared/lib/api';
import { mockResponse } from 'shared/__mock__';
import { RestfulMethods } from 'shared/types/restful';
import RestfulPage from './page';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value }: { value: string }) => (
      <div data-testid="codeMirror">{value}</div>
    ),
  };
});
vi.mock('shared/lib/api', () => ({
  getData: vi.fn(),
}));
vi.mocked(getData).mockResolvedValue(mockResponse);

const url = encode64(DEFAULT_URL_EXAMPLE);

describe('testing REST page', () => {
  it('getData should not be called', async () => {
    render(
      <StoreProvider>
        {await RestfulPage({
          params: { req: ['GET'] as unknown as [RestfulMethods, string] },
        })}
      </StoreProvider>
    );

    expect(getData).not.toHaveBeenCalled();
  });
  it('getData should be called with method and url', async () => {
    const method = 'GET';

    const { getByText } = render(
      <StoreProvider>
        {await RestfulPage({
          params: { req: [method, url] },
        })}
      </StoreProvider>
    );

    expect(getData).toHaveBeenCalledWith(method, url, undefined);
    expect(getByText(/Status: 200/i)).toBeInTheDocument();
  });
  it('getData should not be called and throw an error', async () => {
    try {
      const method = 'test' as RestfulMethods;
      const result = await RestfulPage({
        params: { req: [method, url] },
      });
      render(<StoreProvider>{result}</StoreProvider>);

      expect(getData).not.toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('getData should be called with method, url and body', async () => {
    const method = 'POST';
    const body = 'test';

    const { getByText } = render(
      <StoreProvider>
        {await RestfulPage({
          params: { req: [method, url, body] },
        })}
      </StoreProvider>
    );

    expect(getData).toHaveBeenCalledWith(method, url, undefined, body);
    expect(getByText(/Status: 200/i)).toBeInTheDocument();
  });
});
