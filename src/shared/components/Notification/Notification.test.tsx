import { act, render } from '@testing-library/react';
import { Notification } from './Notification';
import userEvent from '@testing-library/user-event';

describe('testing Notification', () => {
  it('should be a notification', async () => {
    const { getByText, getByRole } = render(<Notification error={'Opps'} />);

    const imgDev = getByText('Opps');

    const btnClose = getByRole('button');

    expect(imgDev).toBeInTheDocument();
    expect(btnClose).toBeInTheDocument();

    await act(async () => await userEvent.click(btnClose));
  });
});
