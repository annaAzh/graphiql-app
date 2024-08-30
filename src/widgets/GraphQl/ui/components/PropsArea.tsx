import { FC, ReactNode, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HeadersEditor } from 'features/HeadersEditor';
import { KeyValueGraphQl, RequestGraphQLData } from 'shared/types/graphQl';
import { HeadersItem } from 'shared/types/restful';
import CodeMirror from '@uiw/react-codemirror';
import { myTheme } from '.';
import style from './PropsArea.module.scss';

const convertToKeyValueGraphQl = (items: HeadersItem[]): KeyValueGraphQl[] => {
  return items.map((item) => ({
    key: item.key || '',
    value: item.value || '',
  }));
};

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

  if (activeHeader === 'requestHeaders') {
    content = (
      <HeadersEditor
        key="requestHeaders"
        initialValue={watch('requestHeaders')}
        callback={(value: HeadersItem[]) =>
          setValue('requestHeaders', convertToKeyValueGraphQl(value))
        }
      />
    );
  } else if (activeHeader === 'variables') {
    content = (
      <HeadersEditor
        key="variables"
        initialValue={watch('variables')}
        callback={(value: HeadersItem[]) =>
          setValue('variables', convertToKeyValueGraphQl(value))
        }
      />
    );
  } else {
    content = (
      <CodeMirror
        theme={myTheme}
        value={watch('query')}
        width="100%"
        height="200px"
        onChange={(value) => setValue('query', value)}
      />
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
            {header}
          </p>
        ))}
      </div>
      {content}
    </>
  );
};
