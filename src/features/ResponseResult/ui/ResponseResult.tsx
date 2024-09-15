'use client';

import { FC, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { myTheme } from 'shared/styles/codemirror/EditorView';
import style from './ResponseResult.module.scss';
import { Path } from 'shared/types/path';
import { addResult, getResult, ResultResponse } from 'entities/Result';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  response?: ResultResponse;
  redactor?: string;
};

export const ResponseResult: FC<Props> = ({
  response,
  redactor = `${Path.REST}`,
}) => {
  const dynamicTheme = myTheme(redactor);
  const dispatch = useAppDispatch();
  const data = useAppSelector(getResult);
  const { t } = useTranslation();

  useEffect(() => {
    if (!response) return;
    dispatch(addResult(response));
  }, []);

  return (
    <>
      {data && (
        <div className={style.container}>
          <p className={style.status_text}>
            {t('Status')} {data.status}
          </p>
          <div style={{ width: '100%' }}>
            <CodeMirror
              value={data.body}
              theme={dynamicTheme}
              width="100%"
              height="200px"
              readOnly={true}
            />
          </div>
        </div>
      )}
    </>
  );
};
