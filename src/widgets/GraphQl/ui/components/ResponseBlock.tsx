'use client';

import { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { myTheme } from './EditorView';
import style from '../GraphQlPlayground.module.scss';

type Props = {
  value: string;
  status: number;
};

export const ResponseBlock: FC<Props> = ({ value, status }) => {
  return (
    <div className={style.container}>
      <p className={style.status_text}>Status: {status}</p>
      <div style={{ width: '100%' }}>
        <CodeMirror
          value={value}
          theme={myTheme}
          width="100%"
          height="200px"
          readOnly={true}
        />
      </div>
    </div>
  );
};
