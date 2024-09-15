import { describe, expect, it } from 'vitest';
import { rubik, rubik_doodle } from './fonts';

vi.mock('next/font/google', () => ({
  Rubik: vi.fn(() => ({
    subsets: ['cyrillic', 'latin'],
    variable: '--font-rubik',
    weight: ['400', '500', '700', '900'],
    display: 'swap',
  })),
  Rubik_Doodle_Shadow: vi.fn(() => ({
    subsets: ['cyrillic', 'latin'],
    variable: '--font-rubik-doodle',
    weight: ['400'],
    display: 'swap',
    adjustFontFallback: false,
  })),
}));

describe('test fonts configuration', () => {
  it('should have correct Rubik font configuration', () => {
    expect(rubik).toEqual({
      subsets: ['cyrillic', 'latin'],
      variable: '--font-rubik',
      weight: ['400', '500', '700', '900'],
      display: 'swap',
    });
  });

  it('should have correct Rubik Doodle Shadow font configuration', () => {
    expect(rubik_doodle).toEqual({
      subsets: ['cyrillic', 'latin'],
      variable: '--font-rubik-doodle',
      weight: ['400'],
      display: 'swap',
      adjustFontFallback: false,
    });
  });
});
