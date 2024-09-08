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
import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { IntrospectionQuery } from 'graphql';
import './docsExplorer.scss';
import { Box, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useClearResult } from 'shared/lib/hooks';
import { useEncodeProps } from 'shared/lib/hooks/useEncodeProps/useEncodeProps';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';
import { encodeGraphql } from 'shared/lib/dataConverters/encodeGraphQl/encodeQraphQl';
import { HistoryGraphSave } from 'shared/types/app';

const GraphQlPlayground = ({ children }: { children?: ReactNode }) => {
  const navigate = useRouter();
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

    setLocalStoreState(newData);
    const path = encodeGraphql(data);
    navigate.push(path);
  };

  const getSchema = async () => {
    try {
      const data = await fetchSDLSchema(sdlUrl);

      if (data?.data && typeof data.data !== 'string') {
        setSchema(data.data);
        setDocsShown(true);
      }
    } catch {
      setSchema(null);
      return <>Error</>;
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
            <Button onClick={() => setDocsShown(!shownDocs)}>docs</Button>
          )}
        </div>

        <div className={style.main}>
          <div
            className={
              shownDocs
                ? `${style.docs} ${style.shown} custom-doc-explorer`
                : `${style.docs} custom-doc-explorer`
            }
          >
            {shownDocs && (
              <Drawer open={shownDocs} onClose={() => setDocsShown(!shownDocs)}>
                <Box
                  className={style.drawer}
                  sx={{ width: 360 }}
                  p={2}
                  role="presentation"
                >
                  <Button
                    variant="outlined"
                    size="lg"
                    onClick={() => setDocsShown(!shownDocs)}
                    className={style.close_btn}
                  >
                    <CloseIcon />
                  </Button>
                  <GraphiQLProvider
                    fetcher={createGraphiQLFetcher({ url: sdlUrl })}
                  >
                    <DocExplorer />
                  </GraphiQLProvider>
                </Box>
              </Drawer>
            )}
          </div>
          <div className={style.sessions}>
            <h3 className={style.main_title}>GraphQl Playground</h3>
            <div className={style.container}>
              <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className={style.form}
              >
                <div className={style.url_wrapper}>
                  <input
                    {...register('url')}
                    placeholder="https://url..."
                    defaultValue={DEFAULT_URL_GRAPHQL_EXAMPLE}
                    type="text"
                    className={style.input}
                  />
                  <Button variant="outlined" size="lg" type="submit">
                    send
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
