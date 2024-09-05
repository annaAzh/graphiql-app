import { FC, ReactNode, useEffect, useState } from 'react';
import style from './PropsArea.module.scss';
import {
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';
import { HeadersItem, PartialRest, RestfulType } from 'shared/types/restful';
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
  setEncodeValue: (
    key: keyof PartialRest,
    value: string | HeadersItem[] | undefined
  ) => void;
}

export const PropsArea: FC<PropsAreaProps> = ({
  setValue,
  watch,
  register,
  setEncodeValue,
}) => {
  const [activeHeader, setActiveHeader] = useState(headers[0]);
  const [content, setContent] = useState<ReactNode>(null);
  const watchHeaders = watch('headers');
  const watchVariables = watch('variables');

  useEffect(() => {
    if (activeHeader === 'headers') {
      setContent(
        <HeadersEditor
          key="headers"
          initialValue={watchHeaders}
          callback={(value: HeadersItem[]) => setValue('headers', value)}
        />
      );
    } else if (activeHeader === 'variables') {
      setContent(
        <HeadersEditor
          key="variables"
          initialValue={watchVariables}
          callback={(value: HeadersItem[]) => setValue('variables', value)}
        />
      );
    } else {
      setContent(
        <textarea
          className={style.textArea}
          placeholder="Enter your body"
          {...register('body')}
          onBlur={(e) => bodyHandler(e.target.value)}
          defaultValue={watch('body')}
        />
      );
    }
  }, [activeHeader, watchHeaders]);

  useEffect(() => {
    if (!watchHeaders) return;
    setEncodeValue('headers', watchHeaders);
  }, [watchHeaders]);

  useEffect(() => {
    setEncodeValue('variables', watchVariables);
  }, [watchVariables]);

  const bodyHandler = (value: string) => {
    setEncodeValue('body', value);
  };

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
