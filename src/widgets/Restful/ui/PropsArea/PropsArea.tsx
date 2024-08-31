import { FC, ReactNode, useEffect, useState } from 'react';
import style from './PropsArea.module.scss';
import {
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';
import { HeadersItem, RestfulType } from 'shared/types/restful';
import { HeadersEditor } from 'features/HeadersEditor';

const headers: (keyof Pick<RestfulType, 'headers' | 'body' | 'variables'>)[] = [
  'headers',
  'variables',
  'body',
];

interface PropsAreaProps {
  setValue: UseFormSetValue<RestfulType>;
  watch: UseFormWatch<RestfulType>;
  register: UseFormRegister<RestfulType>;
}

export const PropsArea: FC<PropsAreaProps> = ({
  setValue,
  watch,
  register,
}) => {
  const [activeHeader, setActiveHeader] = useState(headers[0]);
  const [content, setContent] = useState<ReactNode>(null);

  useEffect(() => {
    if (activeHeader === 'headers') {
      setContent(
        <HeadersEditor
          key="headers"
          initialValue={watch('headers')}
          callback={(value: HeadersItem[]) => setValue('headers', value)}
        />
      );
    } else if (activeHeader === 'variables') {
      setContent(
        <HeadersEditor
          key="variables"
          initialValue={watch('variables')}
          callback={(value: HeadersItem[]) => setValue('variables', value)}
        />
      );
    } else {
      setContent(
        <textarea
          className={style.textArea}
          placeholder="Enter your body"
          {...register('body')}
          defaultValue={watch('body')}
        />
      );
    }
  }, [activeHeader, watch('headers')]);

  return (
    <>
      <div className={style.headers}>
        {headers.map((header, i) => (
          <p
            key={i}
            className={activeHeader === header ? style.active : undefined}
            onClick={() => setActiveHeader(header)}
          >
            {header}
          </p>
        ))}
      </div>
      {content}
    </>
  );
};
