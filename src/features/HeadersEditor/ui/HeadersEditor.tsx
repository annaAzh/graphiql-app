import { FC, useEffect, useState } from 'react';
import style from './HeadersEditor.module.scss';
import { HeadersItem } from 'shared/types/restful';
import { useTranslation } from 'react-i18next';

interface HeadersEditorProps {
  initialValue?: HeadersItem[];
  callback: (value: HeadersItem[]) => void;
}

export const HeadersEditor: FC<HeadersEditorProps> = ({
  initialValue,
  callback,
}) => {
  const [data, setData] = useState<HeadersItem[]>(initialValue || [{}]);
  const { t } = useTranslation();

  const setValue = (key: keyof HeadersItem, index: number, value: string) => {
    if (index === data.length - 1) setData((prev) => [...prev, {}]);

    setData((prev) => {
      const newValue = [...prev];
      newValue.splice(index, 1, { ...data[index], [key]: value });
      return newValue;
    });
  };

  const removeHandler = (index: number) => {
    setData((prev) => {
      const newValue = [...prev];
      newValue.splice(index, 1);
      return newValue;
    });
  };

  useEffect(() => callback(data), [data]);

  return (
    <div className={style.keyAndValue}>
      {new Array(data.length).fill(null).map((_, index) => (
        <div className={style.line} key={index}>
          <input
            type="text"
            placeholder={t('Key')}
            onChange={(e) => setValue('key', index, e.target.value)}
            value={data[index].key || ''}
          />
          <input
            type="text"
            placeholder={t('Value')}
            onChange={(e) => setValue('value', index, e.target.value)}
            value={data[index].value || ''}
          />
          {data.length - 1 ? (
            <div className={style.cross} onClick={() => removeHandler(index)}>
              X
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
