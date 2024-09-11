import { configureStore } from '@reduxjs/toolkit';
import { resultReducer } from 'entities/Result';

export const mockStore = configureStore({
  reducer: { result: resultReducer },
});
