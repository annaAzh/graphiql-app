'use client';

import { ReactNode } from 'react';
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

const GraphQlPlayground = ({ children }: { children?: ReactNode }) => {
  const navigate = useRouter();
  const { handleSubmit, register, watch, setValue } =
    useForm<RequestGraphQLData>({
      defaultValues: {
        query: DEFAULT_QUERY_GRAPHQL_EXAMPLE,
        baseUrl: DEFAULT_URL_GRAPHQL_EXAMPLE,
      },
    });

  const queryValue = watch('query');

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
          <PropsArea setValue={setValue} watch={watch} />
        </form>

        {children}
      </div>
    </>
  );
};

export { GraphQlPlayground };
