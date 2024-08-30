import { FC, ReactNode, useState } from 'react';
import style from './PropsArea.module.scss';
import {
  UseFormSetValue,
  FieldValues,
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
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<RestfulType>;
}

export const PropsArea: FC<PropsAreaProps> = ({
  setValue,
  watch,
  register,
}) => {
  const [activeHeader, setActiveHeader] = useState(headers[0]);
  let content: ReactNode;

  if (activeHeader === 'headers') {
    content = (
      <HeadersEditor
        key="headers"
        initialValue={watch('headers')}
        callback={(value: HeadersItem[]) => setValue('headers', value)}
      />
    );
  } else if (activeHeader === 'variables') {
    content = (
      <HeadersEditor
        key="variables"
        initialValue={watch('variables')}
        callback={(value: HeadersItem[]) => setValue('variables', value)}
      />
    );
  } else {
    content = (
      <textarea
        className={style.textArea}
        placeholder="Enter your body"
        {...register('body')}
        value={watch('body')}
      />
    );
  }

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
