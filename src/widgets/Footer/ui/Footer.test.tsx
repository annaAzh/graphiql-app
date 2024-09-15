import { screen, render } from '@testing-library/react';
import { Footer } from './Footer';

describe('testing ', () => {
  it('should be a header', async () => {
    render(<Footer />);

    const footer = screen.getByAltText(/Anna/i);

    expect(footer).toBeInTheDocument();
  });
});
