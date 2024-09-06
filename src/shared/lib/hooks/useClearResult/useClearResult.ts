import { useEffect } from 'react';
import { useAppDispatch } from '..';
import { clearResult } from 'entities/Result';

export const useClearResult = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearResult());
    };
  }, []);
};
