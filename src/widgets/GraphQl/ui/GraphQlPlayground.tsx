'use client';

import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/components';
import { RequestGraphQLData } from 'shared/types/graphQl';
import {
  DEFAULT_QUERY_GRAPHQL_EXAMPLE,
  DEFAULT_URL_GRAPHQL_EXAMPLE,
} from 'shared/constants';
import { encode64 } from 'shared/lib/dataConverters';
import style from './GraphQlPlayground.module.scss';
import { Path } from 'shared/types/path';
import { PropsArea } from './PropsArea/PropsArea';
import { SDLInput } from './SDLInput/SDLInput';
import { fetchSDLSchema } from 'shared/lib/api/graphQLRequest/graphQlShema';
import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { IntrospectionQuery } from 'graphql';
import './docsExplorer.scss';

const GraphQlPlayground = ({ children }: { children?: ReactNode }) => {
  const navigate = useRouter();
  const { handleSubmit, register, watch, setValue } =
    useForm<RequestGraphQLData>({
      defaultValues: {
        query: DEFAULT_QUERY_GRAPHQL_EXAMPLE,
        baseUrl: DEFAULT_URL_GRAPHQL_EXAMPLE,
      },
    });

  const [schema, setSchema] = useState<IntrospectionQuery | null>(null);
  const [shownDocs, setDocsShown] = useState<boolean>(false);

  const queryValue = watch('query');
  const sdlUrl = watch('baseUrl') + '?sdl';

  const onSubmitHandler = async (data: RequestGraphQLData) => {
    const { baseUrl, requestHeaders, variables } = data;

    const encodedUrl = encode64(baseUrl);
    const encodedQuery = encode64(queryValue);
    const queryParams = new URLSearchParams();

    if (requestHeaders) {
      requestHeaders.forEach((header) => {
        if (header.key && header.value) {
          queryParams.append(
            `header_${encodeURIComponent(header.key)}`,
            encode64(header.value)
          );
        }
      });
    }

    if (variables) {
      variables.forEach((variable) => {
        if (variable.key && variable.value) {
          queryParams.append(
            `variable_${encodeURIComponent(variable.key)}`,
            encode64(variable.value)
          );
        }
      });
    }

    let url = `/${Path.GRAPH}/${encodedUrl}/${encodedQuery}`;
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
    navigate.push(url);
  };

  const getSchema = async () => {
    try {
      const data = await fetchSDLSchema(sdlUrl);

      if (data?.data) {
        setSchema(data.data);
        setDocsShown(true);
      }
    } catch {
      setSchema(null);
      return <>Error</>;
    }
  };

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
              <GraphiQLProvider
                fetcher={createGraphiQLFetcher({ url: sdlUrl })}
              >
                <DocExplorer />
              </GraphiQLProvider>
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
                    {...register('baseUrl')}
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
                <PropsArea setValue={setValue} watch={watch} />
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
