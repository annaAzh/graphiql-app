import { render } from '@testing-library/react';
import NotFound from './not-found';

vi.mock('next/headers', () => ({
  cookies: () => {
    const mockMap = new Map<string, { value: string }>();
    mockMap.set('NEXT_LOCALE', { value: 'en' });
    return mockMap;
  },
}));

test('testing NotFound', () => {
  const { getByText } = render(<NotFound />);

  expect(getByText(/page hasn't been found/i)).toBeInTheDocument();
});
