import { describe, expect, it } from 'vitest';
import { encode64 } from './encode64';

describe('test encode64 function', () => {
  it('get expected result', () => {
    const mockData = 'test data';
    const expected = Buffer.from(mockData).toString('base64');
    const result = encode64(mockData);
    expect(result).toBe(expected);
  });
});
