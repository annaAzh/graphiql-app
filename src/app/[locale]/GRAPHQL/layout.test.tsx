import { act, render, screen } from '@testing-library/react';
import GraphQLLayout from './layout';
import { StoreProvider } from 'core';

vi.mock('@uiw/react-codemirror', () => {
  return {
    default: ({ value }: { value: string }) => (
      <div data-testid="codeMirror">{value}</div>
    ),
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  const { useRouter } =
    await vi.importActual<typeof import('next-router-mock')>(
      'next-router-mock'
    );
  const useParams = vi.fn().mockImplementation(() => {
    return { graphReq: ['test', 'test'] };
  });
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    useParams,
  };
});

test('testing GraphQLLayout', async () => {
  const testText = 'testText';
  await act(async () =>
    render(
      <StoreProvider>
        <GraphQLLayout>{testText}</GraphQLLayout>
      </StoreProvider>
    )
  );

  expect(screen.getByText(testText)).toBeInTheDocument();
});
