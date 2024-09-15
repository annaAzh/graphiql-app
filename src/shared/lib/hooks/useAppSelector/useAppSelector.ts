import { RootState } from 'core';
import { useSelector } from 'react-redux';

export const useAppSelector = useSelector.withTypes<RootState>();
