import fs from 'node:fs';
import path from 'node:path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 10000;

    doStuffByTimeout(callback, timeout);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const timeout = 10000;

    doStuffByInterval(callback, timeout);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, timeout);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 2000;

    doStuffByInterval(callback, interval);
    jest.advanceTimersByTime(6000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join').mockReturnValue('mocked/path/to/file.txt');
    await readFileAsynchronously('test.txt');
    expect(path.join).toHaveBeenCalledWith(expect.any(String), 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously('notExisted.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue('File content');
    jest.spyOn(path, 'join').mockReturnValue('mocked/path/to/file.txt');
    const content = await readFileAsynchronously('text.txt');
    expect(content).toEqual('File content');
  });
});
