import { FC, ReactNode, useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HeadersEditor } from 'features/HeadersEditor';
import {
  KeyValueGraphQl,
  PartialGraphQL,
  RequestGraphQLData,
} from 'shared/types/graphQl';
import style from './PropsArea.module.scss';
import { myTheme } from 'shared/styles/codemirror/EditorView';
import { Path } from 'shared/types/path';
import { BodyEditor } from 'features/BodyEditor';

const headers: (keyof Pick<
  RequestGraphQLData,
  'headers' | 'body' | 'variables'
>)[] = ['headers', 'variables', 'body'];

interface PropsAreaProps {
  setValue: UseFormSetValue<RequestGraphQLData>;
  watch: UseFormWatch<RequestGraphQLData>;
  setEncodeValue: (
    key: keyof PartialGraphQL,
    value: string | KeyValueGraphQl[] | undefined
  ) => void;
}

export const PropsArea: FC<PropsAreaProps> = ({
  setValue,
  watch,
  setEncodeValue,
}) => {
  const [activeHeader, setActiveHeader] = useState(headers[2]);
  const [headerKey, setHeaderKey] = useState(0);
  let content: ReactNode;
  const dynamicTheme = myTheme(Path.GRAPH);
  const query = watch('body');
  const variables = watch('variables');
  const requestHeaders = watch('headers');

  const handleQuery = () => {
    setEncodeValue('body', query);
  };

  useEffect(() => {
    if (!requestHeaders) return;
    if (!headerKey) setHeaderKey((prev) => (prev += 1));
    setEncodeValue('headers', requestHeaders);
  }, [requestHeaders]);

  useEffect(() => {
    setEncodeValue('variables', variables);
  }, [variables]);

  if (activeHeader === 'headers') {
    content = (
      <HeadersEditor
        key="headers"
        initialValue={requestHeaders}
        callback={(value: KeyValueGraphQl[]) => setValue('headers', value)}
      />
    );
  } else if (activeHeader === 'variables') {
    content = (
      <HeadersEditor
        key="variables"
        initialValue={variables}
        callback={(value: KeyValueGraphQl[]) => setValue('variables', value)}
      />
    );
  } else {
    content = (
      <BodyEditor
        dynamicTheme={dynamicTheme}
        onBlurCalllBack={handleQuery}
        watch={watch}
        setValue={setValue}
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
            {header === 'body' ? 'query' : header}
          </p>
        ))}
      </div>
      {content}
    </>
  );
};
