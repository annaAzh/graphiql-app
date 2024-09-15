import mockRouter from 'next-router-mock';
import { act, render } from '@testing-library/react';
import { ButtonLogOut } from './ButtonLogOut';
import userEvent from '@testing-library/user-event';

describe('testing Button Log Out', () => {
  it('сonfirm log out', async () => {
    const { getByText } = render(<ButtonLogOut />);

    const btnLogOut = getByText('Sign Out');

    expect(btnLogOut).toBeInTheDocument();

    await act(async () => await userEvent.click(btnLogOut));

    const btnYes = getByText('Yes');

    expect(btnYes).toBeInTheDocument();

    await act(async () => await userEvent.click(btnYes));

    expect(mockRouter).toMatchObject({
      pathname: `/`,
    });
  });
  it('not Log Out', async () => {
    const { getByText } = render(<ButtonLogOut />);

    const btnLogOut = getByText('Sign Out');

    await act(async () => await userEvent.click(btnLogOut));

    const bthNo = getByText('No');

    expect(bthNo).toBeInTheDocument();

    await act(async () => await userEvent.click(bthNo));
  });
});
