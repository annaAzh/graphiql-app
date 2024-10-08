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
import { useTranslation } from 'react-i18next';

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
  const variables = watch('variables');
  const requestHeaders = watch('headers');
  const { t } = useTranslation();

  const handleQuery = () => {
    const value = watch('body');
    setEncodeValue('body', value);
    setValue('body', value);
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
        onBlurCallBack={handleQuery}
        watch={watch}
        setValue={setValue}
        mode="GRAPHQL"
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
            {header === 'body' ? t('query') : t(`${header}`)}
          </p>
        ))}
      </div>
      {content}
    </>
  );
};
