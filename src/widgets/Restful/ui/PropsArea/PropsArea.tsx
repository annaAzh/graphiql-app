import { FC, useEffect, useMemo, useState } from 'react';
import style from './PropsArea.module.scss';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HeadersItem, PartialRest, RestfulType } from 'shared/types/restful';
import { HeadersEditor } from 'features/HeadersEditor';
import CodeMirror from '@uiw/react-codemirror';
import { Button } from '@mui/material';
import { prettifying } from 'shared/lib/dataConverters';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { myTheme } from 'shared/styles/codemirror/EditorView';
import { Path } from 'shared/types/path';

const headers: (keyof Pick<RestfulType, 'headers' | 'body' | 'variables'>)[] = [
  'headers',
  'variables',
  'body',
];

interface PropsAreaProps {
  setValue: UseFormSetValue<RestfulType>;
  watch: UseFormWatch<RestfulType>;
  setEncodeValue: (
    key: keyof PartialRest,
    value: string | HeadersItem[] | undefined
  ) => void;
}

export const PropsArea: FC<PropsAreaProps> = ({
  setValue,
  watch,
  setEncodeValue,
}) => {
  const [activeHeader, setActiveHeader] = useState(headers[0]);
  const [headerKey, setHeaderKey] = useState(0);
  const dynamicTheme = myTheme(Path.REST);
  const watchHeaders = watch('headers');
  const watchVariables = watch('variables');
  const watchBody = watch('body');

  const prettyHandler = () => {
    if (!watchBody) return;
    const prettyQuery = prettifying(watchBody);
    if (prettyQuery !== watchBody) setValue('body', prettyQuery);
  };

  const content = useMemo(() => {
    if (activeHeader === 'headers') {
      return (
        <HeadersEditor
          key={headerKey}
          initialValue={watchHeaders}
          callback={(value: HeadersItem[]) => setValue('headers', value)}
        />
      );
    } else if (activeHeader === 'variables') {
      return (
        <HeadersEditor
          key="variables"
          initialValue={watchVariables}
          callback={(value: HeadersItem[]) => setValue('variables', value)}
        />
      );
    } else {
      return (
        <div style={{ display: 'flex', gap: '10px' }} key="body">
          <CodeMirror
            theme={dynamicTheme}
            value={watch('body')}
            width="100%"
            height="200px"
            onBlur={(e) => bodyHandler(e.target.innerText)}
            style={{ width: '100%' }}
          />
          <div
            style={{
              marginLeft: 'auto',
            }}
          >
            <Button size="small" variant="outlined" onClick={prettyHandler}>
              <AutoFixHighIcon fontSize="small" />
            </Button>
          </div>
        </div>
      );
    }
  }, [activeHeader, headerKey, watchBody]);

  useEffect(() => {
    if (!watchHeaders) return;
    if (!headerKey) setHeaderKey((prev) => (prev += 1));
    setEncodeValue('headers', watchHeaders);
  }, [watchHeaders]);

  useEffect(() => {
    setEncodeValue('variables', watchVariables);
  }, [watchVariables]);

  const bodyHandler = (value: string) => {
    setEncodeValue('body', value);
    setValue('body', value);
  };

  return (
    <>
      <div className={style.headers}>
        {headers.map((header, i) => (
          <p
            key={i}
            className={activeHeader === header ? style.active : undefined}
            onClick={() => setActiveHeader(header)}
          >
            {header}
          </p>
        ))}
      </div>
      {content}
    </>
  );
};
