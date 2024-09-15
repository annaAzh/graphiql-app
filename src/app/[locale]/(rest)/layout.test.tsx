import { render } from '@testing-library/react';
import RestLayout from './layout';
import { StoreProvider } from 'core';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  const { useRouter } =
    await vi.importActual<typeof import('next-router-mock')>(
      'next-router-mock'
    );
  const useParams = vi.fn().mockImplementation(() => {
    return { req: ['REST', 'test', 'test', 'test'] };
  });
  return {
    ...actual,
    useRouter: vi.fn().mockImplementation(useRouter),
    useParams,
  };
});

test('testing RestLayout', async () => {
  const testText = 'testText';
  const { getByText } = render(
    <StoreProvider>
      <RestLayout>{testText}</RestLayout>
    </StoreProvider>
  );

  expect(getByText(testText)).toBeInTheDocument();
});
