import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ResultResponse, ResultSchema } from '../types/result';

const initialState: ResultSchema = {};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    addResult(state: ResultSchema, { payload }: PayloadAction<ResultResponse>) {
      state.result = payload;
    },
    clearResult(state: ResultSchema) {
      state.result = undefined;
    },
  },
});

export const { reducer: resultReducer } = resultSlice;

export const { addResult, clearResult } = resultSlice.actions;
