import { act, render } from '@testing-library/react';
import { PropsArea } from './PropsArea';

const mockSetValue = vi.fn();
const mockWatch = vi.fn();
const mockSetEncodeValue = vi.fn();

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value }: { value: string }) => (
      <div data-testid="codeMirror">{value}</div>
    ),
  };
});

test('testing PropsArea', () => {
  const { getByText } = render(
    <PropsArea
      setValue={mockSetValue}
      watch={mockWatch}
      setEncodeValue={mockSetEncodeValue}
    />
  );

  const body = getByText(/body/);
  act(() => body.click());

  const variables = getByText(/variables/);
  act(() => variables.click());
});
