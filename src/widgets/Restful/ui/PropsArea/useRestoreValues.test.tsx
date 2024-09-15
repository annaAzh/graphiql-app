import { renderHook, waitFor } from '@testing-library/react';
import { decode64, encode64, encodeBody } from 'shared/lib/dataConverters';
import { mockSaveResponse } from 'shared/__mock__';
import { ValidMethods } from 'shared/types/restful';
import { encodeHeaders } from 'shared/lib/dataConverters/encodeHeaders/encodeHeaders';
import { useRestoreValues } from './useRestoreValues';

const mockMethod = 'POST' satisfies ValidMethods;
const mockUrl = encode64(mockSaveResponse.url);
const mockHeaders = encodeHeaders(mockSaveResponse.headers).replace('?', '');
const mockBody = encodeBody({
  body: mockSaveResponse.body,
  variables: mockSaveResponse.variables,
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  const { useRouter } =
    await vi.importActual<typeof import('next-router-mock')>(
      'next-router-mock'
    );
  const useParams = vi.fn().mockImplementation(() => {
    return { req: [mockMethod, mockUrl, mockBody] };
  });
  const useSearchParams = vi.fn().mockImplementation(() => {
    return new URLSearchParams(mockHeaders);
  });
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    useSearchParams,
    useParams,
  };
});
const setValue = vi.fn();

test('testing useRestoreValues', async () => {
  renderHook(() => useRestoreValues({ setValue }));

  await waitFor(() => {
    expect(setValue).toHaveBeenCalledTimes(5);
    expect(setValue).toHaveBeenCalledWith('url', decode64(mockUrl));
    expect(setValue).toHaveBeenCalledWith('method', mockMethod);
    expect(setValue).toHaveBeenCalledWith('variables', [
      ...mockSaveResponse.variables,
      {},
    ]);
    expect(setValue).toHaveBeenCalledWith('body', mockSaveResponse.body);
    expect(setValue).toHaveBeenCalledWith('headers', [
      ...mockSaveResponse.headers,
      {},
    ]);
  });
});
