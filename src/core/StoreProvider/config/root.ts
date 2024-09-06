import { combineReducers } from '@reduxjs/toolkit';
import { resultReducer } from 'entities/Result';

export const rootReducer = combineReducers({
  result: resultReducer,
});
