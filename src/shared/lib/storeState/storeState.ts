import { HistorySave } from 'shared/types/app';
import { decode64, encode64 } from '../dataConverters';

const STORE_KEY = '#21sdcK';

const setLocalStoreState = (value: HistorySave): void => {
  const prevState = getLocalStoreState() || [];
  prevState.unshift(value);

  localStorage.setItem(STORE_KEY, encode64(JSON.stringify(prevState)));
};

const getLocalStoreState = () => {
  const response = localStorage.getItem(STORE_KEY);
  let result: HistorySave[] | undefined;
  if (response) {
    result = JSON.parse(decode64(response));
  }

  return result;
};

export { getLocalStoreState, setLocalStoreState };
