import { render } from '@testing-library/react';
import SignInPage from './page';

test('testing SignIn Page', async () => {
  const { getByTestId } = render(<SignInPage />);

  expect(getByTestId('passwordInput')).toBeInTheDocument();
});
