'use client';
import { FC, ReactNode } from 'react';
import style from './Restful.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { VALID_METHODS } from 'shared/constants';
import { encodeRest } from 'shared/lib/dataConverters';
import { RestfulType } from 'shared/types/restful';
import { PropsArea } from './PropsArea/PropsArea';
import { setLocalStoreState } from 'shared/lib/storeState/storeState';
import { yupResolver } from '@hookform/resolvers/yup';
import { restSchema } from 'shared/constants/restSchema';
import { useClearResult } from 'shared/lib/hooks';
import { useRestoreValues } from './PropsArea/useRestoreValues';
import { useEncodeProps } from 'shared/lib/hooks/useEncodeProps/useEncodeProps';
import { rubik_doodle } from 'shared/styles/fonts/fonts';
import { useCookies } from 'react-cookie';

interface RestfulProps {
  children: ReactNode;
}

export const Restful: FC<RestfulProps> = ({ children }) => {
  const navigate = useRouter();
  const [cookies] = useCookies<string>(['user']);
  const { register, handleSubmit, setValue, watch } = useForm<RestfulType>({
    resolver: yupResolver<RestfulType>(restSchema),
    mode: 'onSubmit',
  });
  const { setEncodeValue } = useEncodeProps();
  const selectedOption = watch('method');
  const onSubmit: SubmitHandler<RestfulType> = (data) => {
    setLocalStoreState(data, cookies.user.uid);
    const path = encodeRest(data);
    navigate.push(path);
  };
  useRestoreValues({ setValue });
  useClearResult();

  return (
    <div className={style.postman}>
      <h2 className={rubik_doodle.className}>REST Client</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.upperSection}>
          <select
            className={`${style.select} ${style[`colorful-${selectedOption}`]}`}
            {...register('method')}
            onChange={(e) => setEncodeValue('method', e.target.value)}
          >
            {VALID_METHODS.map((method, index) => (
              <option className={style[`colorful-${method}`]} key={index}>
                {method}
              </option>
            ))}
          </select>
          <input
            className={style.curl}
            type="text"
            {...register('url')}
            onChange={(e) => setEncodeValue('url', e.target.value)}
          />
          <button className="common-btn" type="submit">
            send
          </button>
        </div>
        <PropsArea
          setValue={setValue}
          watch={watch}
          setEncodeValue={setEncodeValue}
        />
        <div>{children}</div>
      </form>
    </div>
  );
};
