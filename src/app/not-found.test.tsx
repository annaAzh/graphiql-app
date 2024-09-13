import { render } from '@testing-library/react';
import NotFound from './not-found';

test('testing NotFound', () => {
  const { getByText } = render(<NotFound />);

  expect(getByText(/page hasn't been found/i)).toBeInTheDocument();
});
