import { render } from '@testing-library/react';
import Loading from './loading';

test('testing Loading', () => {
  const { getByAltText } = render(<Loading />);

  expect(getByAltText(/spinner/i)).toBeInTheDocument();
});
