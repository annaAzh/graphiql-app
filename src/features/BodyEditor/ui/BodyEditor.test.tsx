import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BodyEditor } from './BodyEditor';
import { prettifying } from 'shared/lib/dataConverters';
import {
  mockDynamicTheme,
  mockOnBlurCallBack,
  mockSetValue,
  mockWatch,
} from 'shared/__mock__';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({
      value,
      onBlur,
    }: {
      value: string;
      onBlur: (value: string) => void;
    }) => (
      <div data-testid="codeMirror" onBlur={(e) => onBlur(e.target.innerText)}>
        {value}
      </div>
    ),
  };
});

vi.mock('shared/lib/dataConverters', () => ({
  prettifying: vi.fn((value) => `The value was prettified : ${value}`),
}));

describe('test body editor component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render body editor component', async () => {
    mockWatch.mockReturnValue('test body');
    render(
      <BodyEditor
        dynamicTheme={mockDynamicTheme}
        watch={mockWatch}
        setValue={mockSetValue}
        onBlurCallBack={mockOnBlurCallBack}
      />
    );

    const prettify_btn = screen.getByTestId(/prettifyBtn/i);
    const codeMirrorElement = screen.getByTestId('codeMirror');

    expect(prettify_btn).toBeInTheDocument();
    expect(codeMirrorElement).toBeInTheDocument();
  });

  it('when the prettify button is pressed it should prettify text', () => {
    mockWatch.mockReturnValue('test body');
    render(
      <BodyEditor
        dynamicTheme={mockDynamicTheme}
        watch={mockWatch}
        setValue={mockSetValue}
        onBlurCallBack={mockOnBlurCallBack}
      />
    );

    const prettify_btn = screen.getByTestId(/prettifyBtn/i);

    fireEvent.click(prettify_btn);

    expect(prettifying).toHaveBeenCalledWith('test body');
    expect(mockSetValue).toHaveBeenCalledWith(
      'body',
      'The value was prettified : test body'
    );
  });

  it('should not call setValue when watchBody is null or undefined', () => {
    mockWatch.mockReturnValue(undefined);

    render(
      <BodyEditor
        dynamicTheme={mockDynamicTheme}
        watch={mockWatch}
        setValue={mockSetValue}
        onBlurCallBack={mockOnBlurCallBack}
      />
    );

    const prettify_btn = screen.getByTestId(/prettifyBtn/i);

    fireEvent.click(prettify_btn);

    expect(mockSetValue).not.toHaveBeenCalled();
  });
});
