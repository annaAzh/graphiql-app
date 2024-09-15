import { render } from '@testing-library/react';
import { Header } from './Header';

describe('testing Header', () => {
  it('should be a header', async () => {
    const { getByText } = render(<Header />);

    const btnSignIn = getByText('Sign Out');

    expect(btnSignIn).toBeInTheDocument();
  });
});
