'use client';
import { FC, ReactNode, useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../config/store';

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const store = useMemo(() => makeStore(), []);

  return <Provider store={store}>{children}</Provider>;
};
