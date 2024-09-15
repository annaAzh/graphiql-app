import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseResult } from './ResponseResult';
import { addResult } from 'entities/Result';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { mockResponse, mockStore } from 'shared/__mock__';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({
      value,
    }: {
      value: string;
      onBlur: (value: string) => void;
    }) => <div data-testid="codeMirror">{value}</div>,
  };
});

vi.mock('shared/lib/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('test body editor component', () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      dispatch
    );
  });

  it('should render body editor component', async () => {
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockResponse
    );
    render(
      <Provider store={mockStore}>
        <ResponseResult response={mockResponse} />
      </Provider>
    );

    const codeMirrorElement = screen.getByTestId('codeMirror');
    expect(codeMirrorElement).toBeInTheDocument();
    expect(codeMirrorElement).toHaveTextContent(mockResponse.body);
    expect(dispatch).toHaveBeenCalledWith(addResult(mockResponse));
  });

  it('should not render response result if response is undefined', () => {
    (useAppSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      undefined
    );
    render(
      <Provider store={mockStore}>
        <ResponseResult />
      </Provider>
    );

    const codeMirrorElement = screen.queryByTestId('codeMirror');
    expect(codeMirrorElement).not.toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
  });
});
