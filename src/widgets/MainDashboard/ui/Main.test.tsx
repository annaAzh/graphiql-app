import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Main } from './Main';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCookies } from 'react-cookie';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

vi.mock('react-cookie', () => ({
  useCookies: vi.fn(),
}));

describe('test main component', () => {
  it('should render main component with sign in and sign up buttons', async () => {
    (useAuthState as ReturnType<typeof vi.fn>).mockImplementation(() => [null]);
    (useCookies as ReturnType<typeof vi.fn>).mockImplementation(() => [
      { user: null },
      vi.fn(),
    ]);

    await act(async () => render(<Main />));

    const sign_in_btn = screen.getByText(/Sign In/i);
    const sign_up_btn = screen.getByText(/Sign up/i);
    const rest_btn = screen.queryByText(/REST Client/i);
    expect(sign_in_btn).toBeInTheDocument();
    expect(sign_up_btn).toBeInTheDocument();
    expect(rest_btn).not.toBeInTheDocument();
  });

  it('should render main component with rest and graphql buttons', async () => {
    (useAuthState as ReturnType<typeof vi.fn>).mockImplementation(() => [
      { displayName: 'Test User' },
      false,
      null,
    ]);
    (useCookies as ReturnType<typeof vi.fn>).mockImplementation(() => [
      { user: 'test-cookie' },
      vi.fn(),
    ]);
    await act(async () => render(<Main />));

    const rest_btn = screen.getByText(/REST Client/i);
    const graph_btn = screen.getByText(/GraphiQL Client/i);
    const history_btn = screen.getByText(/history/i);

    expect(rest_btn).toBeInTheDocument();
    expect(graph_btn).toBeInTheDocument();
    expect(history_btn).toBeInTheDocument();
  });
});
