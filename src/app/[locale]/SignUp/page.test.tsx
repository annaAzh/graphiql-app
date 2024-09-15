import { render } from '@testing-library/react';
import SignUpPage from './page';

test('testing SignIn Page', async () => {
  const { getByTestId } = render(<SignUpPage />);

  expect(getByTestId('nameInput')).toBeInTheDocument();
});
