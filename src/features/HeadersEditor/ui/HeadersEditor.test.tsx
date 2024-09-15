import { act, render } from '@testing-library/react';
import { HeadersEditor } from './HeadersEditor';
import userEvent from '@testing-library/user-event';

const callback = vi.fn();

describe('testing HeadersEditor', () => {
  test('should update key and value after intering', async () => {
    const { getByPlaceholderText } = render(
      <HeadersEditor callback={callback} />
    );

    const keyInput = getByPlaceholderText(/key/);
    const valueInput = getByPlaceholderText(/value/);

    await act(() => userEvent.type(keyInput, 'test'));
    await act(() => userEvent.type(valueInput, 'test'));
    expect(callback).toHaveBeenCalledWith([{ key: 'test', value: 'test' }, {}]);
  });
  test('key and value should close after clicking on close btn', async () => {
    const init = [{ key: 'test', value: 'test' }, {}];
    const { findAllByPlaceholderText, findAllByTestId } = render(
      <HeadersEditor callback={callback} initialValue={init} />
    );
    const keyInputs = await findAllByPlaceholderText(/key/);

    await act(async () => {
      userEvent.hover(keyInputs[0]);
    });

    const closeBtns = await findAllByTestId(/closeBtn/);
    await act(async () => userEvent.click(closeBtns[0]));
  });
});
