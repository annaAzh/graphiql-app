import { render } from '@testing-library/react';
import { Notification } from './Notification';

describe('testing Notification', () => {
  it('should be a notification', async () => {
    const { getByText } = render(<Notification error={'Opps'} />);

    const imgDev = getByText('Opps');

    expect(imgDev).toBeInTheDocument();
  });
});
