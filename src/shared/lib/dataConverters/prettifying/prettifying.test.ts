import { prettifying } from './prettifying';

test('testing getErrorMessage', () => {
  const code = '{user: 12}';

  const result = prettifying(code);

  expect(result).toEqual('{\n  user: 12\n}');
});
