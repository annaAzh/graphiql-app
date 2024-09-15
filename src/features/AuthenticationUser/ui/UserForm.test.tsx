import { act, render } from '@testing-library/react';
import { UserForm } from './UserForm';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

describe('testing UseForm', () => {
  it('should be a form of registration', () => {
    const { getByTestId } = render(<UserForm isLogin={false} />);

    expect(getByTestId('nameInput')).toBeInTheDocument();
    expect(getByTestId('emailInput')).toBeInTheDocument();
    expect(getByTestId('passwordInput')).toBeInTheDocument();
  });

  it('a registration request should be sent', async () => {
    const { getByRole } = render(<UserForm isLogin={false} />);

    const btnSubmit = getByRole('button');
    expect(btnSubmit).toBeInTheDocument();

    await act(async () => await userEvent.click(btnSubmit));

    expect(mockRouter).toMatchObject({
      pathname: `/` || '/ru',
    });
  });
});
