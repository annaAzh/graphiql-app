'use client';
import { FC, ReactNode, useEffect } from 'react';
import style from './Restful.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { DEFAULT_URL_EXAMPLE, VALID_METHODS } from 'shared/constants';
import { encode64 } from 'shared/lib/dataConverters';
import { RestfulType, StringObject } from 'shared/types/restful';
import { PropsArea } from './PropsArea/PropsArea';

interface RestfulProps {
  children: ReactNode;
}

export const Restful: FC<RestfulProps> = ({ children }) => {
  const { register, handleSubmit, setValue, watch } = useForm({ mode: 'all' });
  const navigate = useRouter();
  const selectedOption = watch('type');
  const onSubmit: SubmitHandler<RestfulType> = ({
    url,
    type,
    headers,
    body,
    variables,
  }) => {
    const encodedUrl = encode64(url);
    let encodedHeaders: string | undefined = undefined;
    let formattedBody: StringObject | undefined;

    if (body) {
      formattedBody = JSON.parse(body);
    }

    if (variables) {
      variables.forEach((variable) => {
        if (variable.key !== undefined && variable.value !== undefined) {
          formattedBody = { ...formattedBody, [variable.key]: variable.value };
        }
      });
    }

    if (headers) {
      encodedHeaders = '';
      headers.forEach((header, index) => {
        if (header.key !== undefined && header.value !== undefined) {
          if (index === 0) encodedHeaders += '?';
          else encodedHeaders += '&';

          encodedHeaders += `${header.key}=${encode64(header.value)}`;
        }
      });
    }

    const encodedBody = encode64(JSON.stringify(formattedBody));

    if (encodedHeaders) {
      navigate.push(`/${type}/${encodedUrl}/${encodedBody}${encodedHeaders}`);
    } else {
      navigate.push(`/${type}/${encodedUrl}/${encodedBody}`);
    }
  };

  useEffect(() => {
    setValue('url', DEFAULT_URL_EXAMPLE);
    setValue('type', VALID_METHODS[0]);
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
