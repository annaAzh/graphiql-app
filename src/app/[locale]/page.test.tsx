import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './page';

describe('test main component', () => {
  it('should render main component with sign in and sign up buttons', async () => {
    (useAuthState as ReturnType<typeof vi.fn>).mockImplementation(() => [null]);

    await act(async () => render(<Home />));

    const sign_in_btn = screen.getByText(/Sign In/i);
    const sign_up_btn = screen.getByText(/Sign up/i);

    expect(sign_in_btn).toBeInTheDocument();
    expect(sign_up_btn).toBeInTheDocument();
  });
});
