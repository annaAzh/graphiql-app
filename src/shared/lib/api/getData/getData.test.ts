import { mockResponse, mockSaveResponse } from 'shared/__mock__';
import { ValidMethods } from 'shared/types/restful';
import { getData } from './getData';
import { encode64, encodeBody } from 'shared/lib/dataConverters';
import axios, { AxiosError, AxiosResponse } from 'axios';

vi.mock('axios');

const mockUrl = encode64(mockSaveResponse.url);
const mockHeaders = { 'Content-Type': 'application/json' };
const mockBody = encodeBody({
  body: mockSaveResponse.body,
  variables: mockSaveResponse.variables,
});
const decodedBody = { body: 'test', title: '123' };

afterEach(() => {
  vi.resetAllMocks();
});

describe('testing getData', () => {
  it('should be invalid value', async () => {
    const mockData = 'test';
    const result = await getData(mockData as ValidMethods, mockData);

    expect(result).toBeUndefined();
  });
  it('should be executed with GET method', async () => {
    const mockMethod = mockSaveResponse.method || 'GET';
    vi.mocked(axios.get).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(mockSaveResponse.url, mockHeaders);
    expect(result?.status).toBe(200);
  });
  it('should be executed with POST method', async () => {
    const mockMethod = 'POST' satisfies ValidMethods;
    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      mockSaveResponse.url,
      decodedBody,
      mockHeaders
    );
    expect(result?.status).toBe(200);
  });
  it('should be executed with PUT method', async () => {
    const mockMethod = 'PUT' satisfies ValidMethods;
    vi.mocked(axios.put).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      mockSaveResponse.url,
      decodedBody,
      mockHeaders
    );
    expect(result?.status).toBe(200);
  });
  it('should be executed with PATCH method', async () => {
    const mockMethod = 'PATCH' satisfies ValidMethods;
    vi.mocked(axios.patch).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith(
      mockSaveResponse.url,
      decodedBody,
      mockHeaders
    );
    expect(result?.status).toBe(200);
  });
  it('should be executed with DELETE method', async () => {
    const mockMethod = 'DELETE' satisfies ValidMethods;
    vi.mocked(axios.delete).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(mockSaveResponse.url);
    expect(result?.status).toBe(200);
  });
  it('should be executed with HEAD method', async () => {
    const mockMethod = 'HEAD' satisfies ValidMethods;
    vi.mocked(axios.head).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.head).toHaveBeenCalledTimes(1);
    expect(axios.head).toHaveBeenCalledWith(mockSaveResponse.url, mockHeaders);
    expect(result?.status).toBe(200);
  });
  it('should be executed with OPTIONS method', async () => {
    const mockMethod = 'OPTIONS' satisfies ValidMethods;
    vi.mocked(axios.options).mockResolvedValue(mockResponse);

    const result = await getData(mockMethod, mockUrl, mockHeaders, mockBody);

    expect(axios.options).toHaveBeenCalledTimes(1);
    expect(axios.options).toHaveBeenCalledWith(
      mockSaveResponse.url,
      mockHeaders
    );
    expect(result?.status).toBe(200);
  });
  it('should be executed with result is undefined', async () => {
    const mockMethod = 'GET' satisfies ValidMethods;
    vi.mocked(axios.get).mockResolvedValue(undefined);
    const mockBodyString = encodeBody({
      body: 'test',
      variables: mockSaveResponse.variables,
    });

    const result = await getData(
      mockMethod,
      mockUrl,
      mockHeaders,
      mockBodyString
    );

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
  it('should be executed and throw an AxiosError', async () => {
    const mockError = new AxiosError('Network Error', 'ERR_NETWORK');
    mockError.response = {
      status: 400,
      statusText: 'Something went wrong',
    } as AxiosResponse;

    const mockMethod = 'GET' satisfies ValidMethods;
    vi.mocked(axios.get).mockRejectedValue(mockError);

    const result = await getData(mockMethod, mockUrl, mockHeaders);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ status: 400, body: 'Something went wrong' });
  });
  it('should be executed and throw an Error', async () => {
    const mockError = new Error('Something went wrong');
    const mockMethod = 'GET' satisfies ValidMethods;
    vi.mocked(axios.get).mockRejectedValue(mockError);

    const result = await getData(mockMethod, mockUrl, mockHeaders);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ status: 'Error', body: 'Something went wrong' });
  });
});
