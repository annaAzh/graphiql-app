import { act, render } from '@testing-library/react';
import { HistoryList } from './HistoryList';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';
import { mockSaveResponse, mockUserWithId } from 'shared/__mock__';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { encodeRest } from 'shared/lib/dataConverters';
import { HistorySave } from 'shared/types/app';
import { Path } from 'shared/types/path';

describe('testing HistoryList', () => {
  it('should be with empty store', () => {
    const { getByText } = render(<HistoryList />);

    expect(getByText(/REST Client/i)).toBeInTheDocument();
    expect(getByText(/GRAPHQL/i)).toBeInTheDocument();
  });
  it('should be with response', async () => {
    setLocalStoreState(mockSaveResponse, mockUserWithId);
    const { getByText } = render(<HistoryList />);

    const divWithUrl = getByText(`${mockSaveResponse.url}`);

    expect(getByText(`${mockSaveResponse.method}`)).toBeInTheDocument();
    expect(divWithUrl).toBeInTheDocument();

    await act(async () => await userEvent.click(divWithUrl));

    expect(mockRouter.asPath).toBe(encodeRest(mockSaveResponse));
  });
  it('should be not found route', async () => {
    const badUrl = 'badUrl';
    setLocalStoreState(
      { method: badUrl } as unknown as HistorySave,
      mockUserWithId
    );
    const { getByText } = render(<HistoryList />);

    const divWithUrl = getByText(`${badUrl}`);
    expect(divWithUrl).toBeInTheDocument();

    await act(async () => await userEvent.click(divWithUrl));

    expect(mockRouter.pathname).toBe(`/${Path.NOT_FOUND}`);
  });
});
