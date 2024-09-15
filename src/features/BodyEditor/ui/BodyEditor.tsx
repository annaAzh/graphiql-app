import React, { FC } from 'react';
import CodeMirror, { Extension } from '@uiw/react-codemirror';
import { Button } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { prettifying } from 'shared/lib/dataConverters';
import styles from './BodyEditor.module.scss';
import { RequestGraphQLData } from 'shared/types/graphQl';
import { RestfulType } from 'shared/types/restful';

type Props = {
  dynamicTheme: Extension;
  watch: UseFormWatch<RequestGraphQLData | RestfulType>;
  setValue: UseFormSetValue<RequestGraphQLData | RestfulType>;
  onBlurCallBack: () => void;
  mode: 'GRAPHQL' | 'REST';
};

export const BodyEditor: FC<Props> = ({
  dynamicTheme,
  onBlurCallBack,
  watch,
  setValue,
  mode,
}) => {
  const watchBody = watch('body');

  const prettyHandler = () => {
    if (!watchBody) return;
    const prettyQuery = prettifying(watchBody);
    if (prettyQuery !== watchBody) setValue('body', prettyQuery);
  };

  return (
    <div className={`${styles.body_editor_container} ${styles[mode]}`}>
      <CodeMirror
        className={styles.code_editor}
        theme={dynamicTheme}
        value={watchBody}
        onChange={(value) => setValue('body', value)}
        onBlur={() => onBlurCallBack()}
      />
      <div className={styles.button_container}>
        <Button
          data-testid="prettifyBtn"
          size="small"
          variant="outlined"
          onClick={prettyHandler}
        >
          <AutoFixHighIcon fontSize="small" />
        </Button>
      </div>
    </div>
  );
};
