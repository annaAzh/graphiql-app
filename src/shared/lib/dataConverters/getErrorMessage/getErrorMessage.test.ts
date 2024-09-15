import { getErrorMessage } from './getErrorMessage';

test('testing getErrorMessage', () => {
  const text = ')/213/213/)/213';

  const result = getErrorMessage(text);

  expect(result).toEqual('213');
});
