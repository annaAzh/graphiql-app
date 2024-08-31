'use client';
import { FC, ReactNode, useEffect } from 'react';
import style from './Restful.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { DEFAULT_URL_EXAMPLE, VALID_METHODS } from 'shared/constants';
import { decodeRest, encodeRest } from 'shared/lib/dataConverters';
import { RestfulMethods, RestfulType } from 'shared/types/restful';
import { PropsArea } from './PropsArea/PropsArea';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';
import { yupResolver } from '@hookform/resolvers/yup';
import { restSchema } from 'shared/constants/restSchema';

interface RestfulProps {
  children: ReactNode;
}

export const Restful: FC<RestfulProps> = ({ children }) => {
  const params: {
    req: [RestfulMethods, string, string] | [RestfulMethods, string];
  } = useParams();
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<RestfulType>({
    resolver: yupResolver<RestfulType>(restSchema),
    mode: 'all',
  });
  const selectedOption = watch('type');
  const onSubmit: SubmitHandler<RestfulType> = async (data) => {
    setLocalStoreState(data);
    const path = await encodeRest(data);
    navigate.push(path);
  };

  useEffect(() => {
    const method = params.req[0];
    if (method === 'REST' || params.req.length < 2) {
      setValue('url', DEFAULT_URL_EXAMPLE);
      setValue('type', VALID_METHODS[0]);
    } else {
      const requestedUrl = params.req[1];
      const requestedBody = params.req[2];
      const requestedHeaders = Object.fromEntries(searchParams.entries());
      const { headers, body, url, variables } = decodeRest({
        requestedUrl,
        requestedBody,
        requestedHeaders,
      });

      setValue('url', url);
      setValue('type', method);
      if (variables) setValue('variables', [...variables, {}]);
      if (body) setValue('body', JSON.stringify(body, null, 2));
      if (headers) {
        const formattedHeaders = Object.entries(headers).map((header) => {
          return { key: header[0], value: header[1] };
        });
        setValue('headers', [...formattedHeaders, {}]);
      }
    }
  }, []);

  return (
    <div className={style.postman}>
      <h2>REST Client</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.upperSection}>
          <select
            className={`${style.select} ${style[`colorful-${selectedOption}`]}`}
            {...register('type')}
          >
            {VALID_METHODS.map((method, index) => (
              <option className={style[`colorful-${method}`]} key={index}>
                {method}
              </option>
            ))}
          </select>
          <input className={style.curl} type="text" {...register('url')} />
          <button className="common-btn" type="submit">
            send
          </button>
        </div>
        <PropsArea setValue={setValue} watch={watch} register={register} />
        <div>{children}</div>
      </form>
    </div>
  );
};
