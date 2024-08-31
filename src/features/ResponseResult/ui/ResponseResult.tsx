'use client';

import { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { myTheme } from 'shared/styles/codemirror/EditorView';
import style from './ResponseResult.module.scss';
import { Path } from 'shared/types/path';

type Props = {
  data: {
    body: string;
    status: number;
  };
  redactor?: string;
};

export const ResponseResult: FC<Props> = ({
  data,
  redactor = `${Path.REST}`,
}) => {
  const { status, body } = data;

  const dynamicTheme = myTheme(redactor);

  return (
    <div className={style.container}>
      <p className={style.status_text}>Status: {status}</p>
      <div style={{ width: '100%' }}>
        <CodeMirror
          value={body}
          theme={dynamicTheme}
          width="100%"
          height="200px"
          readOnly={true}
        />
      </div>
    </div>
  );
};
