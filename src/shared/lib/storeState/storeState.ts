import { HistorySave } from 'shared/types/app';
import { decode64, encode64 } from '../dataConverters';

const STORE_KEY = '#21sdcK';

const setLocalStoreState = (value: HistorySave, user: string): void => {
  console.log('user = ', user);
  const prevState = getLocalStoreState(user) || [];
  prevState.unshift(value);

  localStorage.setItem(
    `${STORE_KEY}-${user}`,
    encode64(JSON.stringify(prevState))
  );
};

const getLocalStoreState = (user: string) => {
  const response = localStorage.getItem(`${STORE_KEY}-${user}`);
  let result: HistorySave[] | undefined;
  if (response) {
    result = JSON.parse(decode64(response));
  }

  return result;
};

export { getLocalStoreState, setLocalStoreState };
