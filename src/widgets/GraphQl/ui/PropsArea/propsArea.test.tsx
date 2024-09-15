import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PropsArea } from './PropsArea';
import { KeyValueGraphQl } from 'shared/types/graphQl';
import { mockSetEncodeValue, mockSetValue, mockWatch } from 'shared/__mock__';

vi.mock('features/HeadersEditor', () => ({
  HeadersEditor: ({
    initialValue = [],
  }: {
    initialValue: KeyValueGraphQl[];
  }) => (
    <div data-testid="headersEditor">
      {initialValue.map(({ key, value }, index) => (
        <div key={index}>
          {key}: {value}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('features/BodyEditor', () => ({
  BodyEditor: ({
    onBlurCallBack,
  }: {
    onBlurCallBack: (value: string) => void;
  }) => (
    <textarea
      data-testid="bodyEditor"
      defaultValue="Body Editor"
      onBlur={(e) => onBlurCallBack(e.target.value)}
    />
  ),
}));

describe('test props area component from graphql', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render headers, variables and body', async () => {
    mockWatch.mockReturnValueOnce([]).mockReturnValueOnce([]);
    render(
      <PropsArea
        setValue={mockSetValue}
        watch={mockWatch}
        setEncodeValue={mockSetEncodeValue}
      />
    );

    const headers = screen.getByText(/headers/i);
    expect(headers).toBeInTheDocument();

    const variables = screen.getByText(/variables/i);
    expect(variables).toBeInTheDocument();

    const query = screen.getByText(/query/i);
    expect(query).toBeInTheDocument();
  });

  it('should switch on variables or headers if according buttons pressed', () => {
    const mockHeaders = [{ key: 'Content-Type', value: 'application/json' }];
    mockWatch.mockReturnValueOnce(mockHeaders).mockReturnValueOnce([]);

    render(
      <PropsArea
        setValue={mockSetValue}
        watch={mockWatch}
        setEncodeValue={mockSetEncodeValue}
      />
    );

    const headers_btn = screen.getByText(/headers/i);
    expect(headers_btn).toBeInTheDocument();
    const variables_btn = screen.getByText(/variables/i);
    expect(variables_btn).toBeInTheDocument();

    fireEvent.click(headers_btn);

    const headers_editor = screen.getByTestId(/headersEditor/i);
    expect(headers_editor).toBeInTheDocument();

    fireEvent.click(variables_btn);
    const variablesEditor = screen.getByTestId('headersEditor');
    expect(variablesEditor).toBeInTheDocument();
    expect(variablesEditor).toHaveTextContent('');
  });

  it('should set encoded body', () => {
    const mockBodyValue = 'mock body content';
    mockWatch
      .mockReturnValueOnce([])
      .mockReturnValueOnce([])
      .mockReturnValue(mockBodyValue);

    render(
      <PropsArea
        setValue={mockSetValue}
        watch={mockWatch}
        setEncodeValue={mockSetEncodeValue}
      />
    );

    const bodyEditor = screen.getByTestId('bodyEditor');
    expect(bodyEditor).toBeInTheDocument();

    fireEvent.blur(bodyEditor, { target: { value: mockBodyValue } });

    expect(mockSetEncodeValue).toHaveBeenCalledWith('body', mockBodyValue);
    expect(mockSetValue).toHaveBeenCalledWith('body', mockBodyValue);
  });
});
