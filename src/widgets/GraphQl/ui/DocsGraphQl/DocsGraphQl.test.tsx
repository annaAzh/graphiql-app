import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockOnClick } from 'shared/__mock__';
import { DocsGraphQl } from './DocsGraphQl';

const mockSDLUrl = 'http:mock-url.ru/?sdl';

describe('test docs graphql component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render graphql component while shownDocs is true', async () => {
    render(
      <DocsGraphQl
        sdlUrl={mockSDLUrl}
        onClose={mockOnClick}
        shownDocs={true}
        onClickShowDocs={mockOnClick}
      />
    );

    const docs_drawer = screen.getByTestId(/docs-drawer/i);
    expect(docs_drawer).toBeInTheDocument();
  });
});
