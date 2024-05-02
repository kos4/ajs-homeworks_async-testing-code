import read from '../Modules/reader';
import app from '../app';

jest.mock('../Modules/reader');

beforeEach(() => {
  jest.resetAllMocks();
});

test('app no error', async () => {
  const data = ((input) => {
    const buffer = new ArrayBuffer(input.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < input.length; i += 1) {
      bufferView[i] = input.charCodeAt(i);
    }
    return buffer;
  })('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}');
  read.mockReturnValue(data);

  const value = await app();
  expect(value).toBe('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}');
});

beforeEach(() => {
  jest.resetAllMocks();
});

test('app error', async () => {
  read.mockReturnValue('');

  try {
    await app();
  } catch (error) {
    expect(error).toEqual(new Error('Данные не пришли.'));
  }
});
