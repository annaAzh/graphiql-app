'use client';

import CodeMirror from '@uiw/react-codemirror';
import { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from 'shared/components';
import { RequestGraphQLData } from 'shared/types/graphQl';
import {
  DEFAULT_QUERY_GRAPHQL_EXAMPLE,
  DEFAULT_URL_GRAPHQL_EXAMPLE,
} from 'shared/constants';
import { encode64 } from 'shared/lib/dataConverters';
import { KeyValueBlock, myTheme } from './components';
import style from './GraphQlPlayground.module.scss';

const GraphQlPlayground = ({ children }: { children?: ReactNode }) => {
  const navigate = useRouter();
  const { handleSubmit, register, watch, setValue } =
    useForm<RequestGraphQLData>();

  useEffect(() => {
    register('query', {
      value: DEFAULT_QUERY_GRAPHQL_EXAMPLE,
    });
  }, [register]);

  const queryValue = watch('query', DEFAULT_QUERY_GRAPHQL_EXAMPLE);

  const onSubmitHandler = async (data: RequestGraphQLData) => {
    const { baseUrl, requestHeaders } = data;

    const encodedUrl = encode64(baseUrl);
    const encodedQuery = encode64(queryValue);
    const queryParams = new URLSearchParams();

    if (requestHeaders) {
      requestHeaders.forEach((header) => {
        if (header.key && header.value) {
          queryParams.append(
            encodeURIComponent(header.key),
            encode64(header.value)
          );
        }
      });
    }

    let url = `/GRAPHQL/${encodedUrl}/${encodedQuery}`;
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`;
    }
    navigate.push(url);
  };

  return (
    <>
      <h3 className={style.main_title}>GraphQl Playground</h3>
      <div className={style.container}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className={style.form}>
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

          <CodeMirror
            value={queryValue}
            theme={myTheme}
            width="100%"
            height="300px"
            onChange={(value) => setValue('query', value)}
          />
          <KeyValueBlock
            setValue={setValue}
            watch={watch}
            title="Headers"
            formField="requestHeaders"
          />
          <KeyValueBlock
            setValue={setValue}
            watch={watch}
            title="Variables"
            formField="variables"
          />
        </form>
        {children}
      </div>
    </>
  );
};

export { GraphQlPlayground };
