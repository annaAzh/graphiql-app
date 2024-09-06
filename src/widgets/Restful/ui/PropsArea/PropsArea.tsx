import { FC, useEffect, useMemo, useState } from 'react';
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
  const [headerKey, setHeaderKey] = useState(0);
  const watchHeaders = watch('headers');
  const watchVariables = watch('variables');

  const content = useMemo(() => {
    if (activeHeader === 'headers') {
      return (
        <HeadersEditor
          key={headerKey}
          initialValue={watchHeaders}
          callback={(value: HeadersItem[]) => setValue('headers', value)}
        />
      );
    } else if (activeHeader === 'variables') {
      return (
        <HeadersEditor
          key="variables"
          initialValue={watchVariables}
          callback={(value: HeadersItem[]) => setValue('variables', value)}
        />
      );
    } else {
      return (
        <textarea
          className={style.textArea}
          placeholder="Enter your body"
          {...register('body')}
          onBlur={(e) => bodyHandler(e.target.value)}
          defaultValue={watch('body')}
        />
      );
    }
  }, [activeHeader, headerKey]);

  useEffect(() => {
    if (!watchHeaders) return;
    if (!headerKey) setHeaderKey((prev) => (prev += 1));
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
