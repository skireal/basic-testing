import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');

    throttledGetDataFromApi('/posts');
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create').mockImplementation(
      () =>
        ({
          get: jest.fn().mockResolvedValue({ data: 'mocked data' }),
        } as unknown as AxiosInstance),
    );

    throttledGetDataFromApi('/posts');
    jest.runAllTimers();
    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should return response data', async () => {
    const result = throttledGetDataFromApi('/posts');

    jest.runAllTimers();
    await expect(result).resolves.toEqual('mocked data');
  });
});
