import { FC, ReactNode, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HeadersEditor } from 'features/HeadersEditor';
import { KeyValueGraphQl, RequestGraphQLData } from 'shared/types/graphQl';
import CodeMirror from '@uiw/react-codemirror';
import style from './PropsArea.module.scss';
import { myTheme } from 'shared/styles/codemirror/EditorView';
import { Path } from 'shared/types/path';
import { Button } from '@mui/material';
import { prettifying } from 'shared/lib/dataConverters';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const headers: (keyof Pick<
  RequestGraphQLData,
  'requestHeaders' | 'query' | 'variables'
>)[] = ['requestHeaders', 'variables', 'query'];

interface PropsAreaProps {
  setValue: UseFormSetValue<RequestGraphQLData>;
  watch: UseFormWatch<RequestGraphQLData>;
}

export const PropsArea: FC<PropsAreaProps> = ({ setValue, watch }) => {
  const [activeHeader, setActiveHeader] = useState(headers[2]);
  let content: ReactNode;

  const dynamicTheme = myTheme(Path.GRAPH);

  if (activeHeader === 'requestHeaders') {
    content = (
      <HeadersEditor
        key="requestHeaders"
        initialValue={watch('requestHeaders')}
        callback={(value: KeyValueGraphQl[]) =>
          setValue('requestHeaders', value)
        }
      />
    );
  } else if (activeHeader === 'variables') {
    content = (
      <HeadersEditor
        key="variables"
        initialValue={watch('variables')}
        callback={(value: KeyValueGraphQl[]) => setValue('variables', value)}
      />
    );
  } else {
    content = (
      <div style={{ display: 'flex', gap: '10px' }}>
        <CodeMirror
          theme={dynamicTheme}
          value={watch('query')}
          width="100%"
          height="200px"
          onChange={(value) => setValue('query', value)}
          style={{ width: '100%' }}
        />
        <div
          style={{
            marginLeft: 'auto',
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              const prevQuery = watch('query');

              if (prevQuery) {
                const prettyQuery = prettifying(prevQuery);
                if (prettyQuery !== prevQuery) {
                  setValue('query', prettyQuery);
                }
              }
            }}
          >
            <AutoFixHighIcon fontSize="small" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={style.headers}>
        {headers.map((header, i) => (
          <p
            key={i}
            className={activeHeader === header ? style.active : undefined}
            onClick={() => setActiveHeader(header)}
          >
            {header === 'requestHeaders' ? 'headers' : header}
          </p>
        ))}
      </div>
      {content}
    </>
  );
};
