import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchGraphQlData } from './graphQlRequest';
import { mockRequestGraphQLData, mockResponse, mockUrl } from 'shared/__mock__';

vi.mock('axios');

describe('test fetchGraphQlData function', () => {
  it('should fetch data successfully', async () => {
    (axios.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      status: 200,
      data: {
        data: mockResponse,
      },
    });

    const result = await fetchGraphQlData(mockRequestGraphQLData);

    expect(axios.post).toHaveBeenCalledWith(
      mockUrl,
      {
        query: mockRequestGraphQLData.body,
        variables: { name: 'Rick' },
      },
      {
        headers: {
          'test-headers': 'test-value',
        },
      }
    );

    expect(result).toEqual({
      status: 200,
      data: mockResponse,
    });
  });

  it('should return undefined when error has no response', async () => {
    const mockError = new Error('Network Error');

    (axios.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(mockError);

    const result = await fetchGraphQlData(mockRequestGraphQLData);

    expect(result).toBeUndefined();
  });
});
