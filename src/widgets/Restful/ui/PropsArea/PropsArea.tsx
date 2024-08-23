import { FC, useState } from 'react';
import style from './PropsArea.module.scss';
import {
  UseFormSetValue,
  FieldValues,
  UseFormWatch,
  UseFormRegister,
} from 'react-hook-form';
import { HeadersItem, RestfulType } from 'shared/types/restful';
import { HeadersEditor } from 'features/HeadersEditor';

const headers: (keyof Pick<RestfulType, 'headers' | 'body'>)[] = [
  'headers',
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
  const initHeaders = watch('headers');
  const initBody = watch('body');

  const updateHeaders = (value: HeadersItem[]) => setValue('headers', value);

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
      {activeHeader === 'headers' ? (
        <HeadersEditor initialValue={initHeaders} callback={updateHeaders} />
      ) : (
        <textarea
          className={style.textArea}
          placeholder="Enter your body"
          {...register('body')}
          value={initBody}
        ></textarea>
      )}
    </>
  );
};
