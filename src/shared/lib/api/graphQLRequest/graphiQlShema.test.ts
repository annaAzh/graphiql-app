import { describe, it, expect, vi } from 'vitest';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { mockResponse, mockUrl } from 'shared/__mock__';
import { fetchSDLSchema } from './graphQlShema';
import INTROSPECTION_QUERY from './IntrospectionQuery';

vi.mock('axios');
const mockUrlSdl = mockUrl + '?sdl';
const mockBody = {
  operationName: 'IntrospectionQuery',
  query: INTROSPECTION_QUERY,
};

describe('test fetchGraphQlSchema', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch data successfully', async () => {
    (axios.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      status: 200,
      data: {
        data: mockResponse,
      },
    });

    await fetchSDLSchema(mockUrlSdl);

    expect(axios.post).toHaveBeenCalledWith(mockUrlSdl, mockBody);
  });

  it('should be executed and throw an AxiosError', async () => {
    const mockError = new AxiosError('Network Error', 'ERR_NETWORK');
    mockError.response = {
      status: 400,
      statusText: 'Something went wrong',
    } as AxiosResponse;

    vi.mocked(axios.post).mockRejectedValue(mockError);

    const result = await fetchSDLSchema(mockUrlSdl);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ status: 'Error', data: '' });
  });

  it('should be executed and throw an Error', async () => {
    const mockError = new Error('Something went wrong');
    vi.mocked(axios.post).mockRejectedValue(mockError);

    const result = await fetchSDLSchema(mockUrlSdl);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ status: 'Error', data: 'Something went wrong' });
  });
});
