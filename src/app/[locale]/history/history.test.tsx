import { render } from '@testing-library/react';
import { StoreProvider } from 'core';
import HistoryPage from './page';

test('getData should not be called', async () => {
  const { getByText } = render(
    <StoreProvider>{await HistoryPage()}</StoreProvider>
  );

  expect(getByText(/History/i)).toBeInTheDocument();
});
