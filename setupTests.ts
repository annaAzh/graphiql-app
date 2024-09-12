import '@testing-library/jest-dom';

beforeAll(() => {
  vi.mock('next/font/google', () => ({
    Rubik: () => ({
      style: {
        fontFamily: 'mocked',
      },
    }),
    Rubik_Doodle_Shadow: () => ({
      style: {
        fontFamily: 'mocked',
      },
    }),
  }));
});
