'use client';
import { useEffect, useState } from 'react';
import { getLocalStoreState } from 'shared/lib/storeState/storeState';
import { HistorySave } from 'shared/types/app';
import style from './HistoryList.module.scss';
import { useRouter } from 'next/navigation';
import { encodeRest } from 'shared/lib/dataConverters';
import Link from 'next/link';
import { Path } from 'shared/types/path';
import { Button, Title } from 'shared/components';
import { encodeGraphql } from 'shared/lib/dataConverters/encodeGraphQl/encodeQraphQl';
import { useCookies } from 'react-cookie';
import { VALID_METHODS } from 'shared/constants';

export const HistoryList = () => {
  const navigate = useRouter();
  const [list, setList] = useState<HistorySave[]>();
  const [cookies] = useCookies<string>(['user']);

  useEffect(() => {
    const save = getLocalStoreState(cookies.user.uid);
    if (save) setList(save);
  }, []);

  const clickHandler = async (index: number) => {
    if (!list) return;
    const method = list[index].method;
    let path: string | undefined;
    if (method === 'GRAPHQL') {
      path = encodeGraphql(list[index]);
    } else if (method && VALID_METHODS.includes(method)) {
      path = encodeRest(list[index]);
    } else {
      path = Path.NOT_FOUND;
    }

    navigate.push(path);
  };

  return (
    <div className={style.historyList}>
      {list ? (
        <div className={style.container}>
          <Title size="h3" className={style.label}>
            History Requests
          </Title>
          {list.map(({ method, url }, index) => (
            <div
              key={index}
              className={style.line}
              onClick={() => clickHandler(index)}
            >
              <div className={`${style.type} ${style[`colorful-${method}`]}`}>
                {method}
              </div>
              <div className={style.url}>{url}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.empty}>
          <p>{`You haven't executed any requests`}</p>
          <p>{`It's empty here. Try:`}</p>
          <div className={style.buttons}>
            <Button variant="secondary">
              <Link href={Path.REST}>REST Client</Link>
            </Button>
            <Button>
              <Link href={Path.GRAPH}>GRAPHQL</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
