'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/components';
import { RequestGraphQLData } from 'shared/types/graphQl';
import {
  DEFAULT_QUERY_GRAPHQL_EXAMPLE,
  DEFAULT_URL_GRAPHQL_EXAMPLE,
} from 'shared/constants';
import style from './GraphQlPlayground.module.scss';
import { PropsArea } from './PropsArea/PropsArea';
import { SDLInput } from './SDLInput/SDLInput';
import { fetchSDLSchema } from 'shared/lib/api/graphQLRequest/graphQlShema';
import { IntrospectionQuery } from 'graphql';
import { useClearResult } from 'shared/lib/hooks';
import { useEncodeProps } from 'shared/lib/hooks/useEncodeProps/useEncodeProps';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';
import { encodeGraphql } from 'shared/lib/dataConverters/encodeGraphQl/encodeQraphQl';
import { HistoryGraphSave } from 'shared/types/app';
import { useRestoreValues } from './PropsArea/useRestoreValues';
import clsx from 'clsx';
import { rubik_doodle } from 'shared/styles/fonts/fonts';
import { DocsGraphQl } from './DocsGraphQl/DocsGraphQl';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

const GraphQlPlayground = ({ children }: { children?: ReactNode }) => {
  const navigate = useRouter();
  const { t } = useTranslation();
  useClearResult();
  const { handleSubmit, register, watch, setValue } =
    useForm<RequestGraphQLData>({
      defaultValues: {
        body: DEFAULT_QUERY_GRAPHQL_EXAMPLE,
        url: DEFAULT_URL_GRAPHQL_EXAMPLE,
      },
      mode: 'onSubmit',
    });

  const [schema, setSchema] = useState<IntrospectionQuery | null>(null);
  const [shownDocs, setDocsShown] = useState<boolean>(false);
  const { setEncodeValue } = useEncodeProps('GRAPHQL');
  const url = watch('url');
  const [cookies] = useCookies<string>(['user']);

  const queryValue = watch('body');
  const sdlUrl = url + '?sdl';

  const onSubmitHandler = async (data: RequestGraphQLData) => {
    const { url, headers, variables } = data;

    const newData: HistoryGraphSave = {
      url,
      headers,
      variables,
      body: queryValue,
      method: 'GRAPHQL',
    };

    setLocalStoreState(newData, cookies.user.uid);
    const path = encodeGraphql(data);
    navigate.push(path);
  };

  useRestoreValues({ setValue });

  const getSchema = async () => {
    try {
      const result = await fetchSDLSchema(sdlUrl);

      if (result) {
        const { status, data } = result;

        if (status === 200 && data && typeof data !== 'string') {
          setSchema(data);
          setDocsShown(true);
        }
      }
    } catch {
      setSchema(null);
    }
  };

  useEffect(() => {
    if (queryValue) {
      setEncodeValue('body', queryValue);
    }
  }, []);

  return (
    <section className={style.section}>
      <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <div className={style.sidebar}>
          {schema && (
            <Button onClick={() => setDocsShown(!shownDocs)}>
              {t('docs')}
            </Button>
          )}
        </div>

        <div className={style.main}>
          <DocsGraphQl
            sdlUrl={sdlUrl}
            shownDocs={shownDocs}
            onClose={() => setDocsShown(!shownDocs)}
            onClickShowDocs={() => setDocsShown(!shownDocs)}
          />
          <div className={style.sessions}>
            <h3 className={clsx(style.main_title, rubik_doodle.className)}>
              {t('GraphiQL')}
            </h3>
            <div className={style.container}>
              <form
                data-testid="graphql-form"
                onSubmit={handleSubmit(onSubmitHandler)}
                className={style.form}
              >
                <div className={style.url_wrapper}>
                  <input
                    data-testid="graphql-url"
                    {...register('url')}
                    placeholder="https://url..."
                    type="text"
                    className={style.input}
                  />
                  <Button
                    data-testid="graphql-submit"
                    variant="outlined"
                    size="lg"
                    type="submit"
                  >
                    {t('send')}
                  </Button>
                </div>
                <SDLInput
                  watch={watch}
                  onClick={getSchema}
                  setValue={setValue}
                />
                <PropsArea
                  setValue={setValue}
                  watch={watch}
                  setEncodeValue={setEncodeValue}
                />
              </form>

              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { GraphQlPlayground };
