import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { SDLInput } from './SDLInput';
import { mockOnClick, mockSetValue, mockWatch } from 'shared/__mock__';

describe('test SDLInput component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should sdl url with right value', async () => {
    const sdl_value = 'https://test_url.ru';
    mockWatch.mockReturnValue(sdl_value);
    render(
      <SDLInput
        watch={mockWatch}
        setValue={mockSetValue}
        onClick={mockOnClick}
      />
    );

    const sdl_input = screen.getByTestId(/sdl_input/i);

    expect(sdl_input).toBeInTheDocument();
    expect(sdl_input).toHaveValue(sdl_value + '?sdl');
  });

  it('should call setValue when sdlUrl changes', () => {
    const sdl_value = 'https://test_url.ru';
    const new_sdl_value = 'https://new_test_url.ru';
    mockWatch.mockReturnValue(sdl_value);
    render(
      <SDLInput
        watch={mockWatch}
        setValue={mockSetValue}
        onClick={mockOnClick}
      />
    );

    const sdl_input = screen.getByTestId(/sdl_input/i);

    fireEvent.change(sdl_input, { target: { value: new_sdl_value } });

    expect(mockSetValue).toHaveBeenCalledWith('url', new_sdl_value);
  });

  it('should call setValue when sdlUrl changes on key press', async () => {
    const sdl_value = 'https://test_url.ru';
    mockWatch.mockReturnValue(sdl_value);
    render(
      <SDLInput
        watch={mockWatch}
        setValue={mockSetValue}
        onClick={mockOnClick}
      />
    );

    const sdl_input = screen.getByTestId(/sdl_input/i);

    fireEvent.keyDown(sdl_input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should call onClick if button with docs pressed', () => {
    const sdl_value = 'https://test_url.ru';
    mockWatch.mockReturnValue(sdl_value);
    render(
      <SDLInput
        watch={mockWatch}
        setValue={mockSetValue}
        onClick={mockOnClick}
      />
    );

    const docs_btn = screen.getByRole('button');
    fireEvent.click(docs_btn);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should set sdlUrl to "?sdl" if url is not provided', () => {
    mockWatch.mockReturnValue(undefined);
    render(
      <SDLInput
        watch={mockWatch}
        setValue={mockSetValue}
        onClick={mockOnClick}
      />
    );

    const sdl_input = screen.getByTestId(/sdl_input/i);
    expect(sdl_input).toHaveValue('?sdl');
  });
});
