import '@testing-library/jest-dom';
import { useCookies } from 'react-cookie';
import { mockUserWithId } from 'shared/__mock__';

beforeAll(() => {
  vi.mock('react-cookie', () => ({
    useCookies: vi.fn(),
  }));
  (useCookies as ReturnType<typeof vi.fn>).mockImplementation(() => [
    { user: { uid: mockUserWithId } },
    vi.fn(),
  ]);

  vi.mock('react-firebase-hooks/auth', () => ({
    useAuthState: vi.fn(),
  }));

  vi.mock('next/navigation', async (importOriginal) => {
    const actual = await importOriginal<typeof import('next/navigation')>();
    const { useRouter } =
      await vi.importActual<typeof import('next-router-mock')>(
        'next-router-mock'
      );
    return {
      ...actual,
      useRouter: vi.fn().mockImplementation(useRouter),
    };
  });

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
