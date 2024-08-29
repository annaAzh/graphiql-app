'use client';

import { FC } from 'react';
import { Button, Title } from 'shared/components';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { KeyValueGraphQl, RequestGraphQLData } from 'shared/types/graphQl';
import style from '../GraphQlPlayground.module.scss';

type Props = {
  setValue: UseFormSetValue<RequestGraphQLData>;
  watch: UseFormWatch<RequestGraphQLData>;
  title: string;
  formField: keyof RequestGraphQLData;
};

const KeyValueBlock: FC<Props> = ({ setValue, watch, title, formField }) => {
  const items = (watch(formField) as KeyValueGraphQl[]) || [
    { key: '', value: '' },
  ];

  const addHeader = () => {
    const newItems = [...items, { key: '', value: '' }];
    setValue(formField, newItems);
  };

  const deleteHeader = (index: number) => {
    if (items?.length === 1) return;
    const newItems = items?.filter((_, i) => i !== index);
    setValue(formField, newItems);
  };

  const handleHeaderChange = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newItems = items?.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setValue('requestHeaders', newItems);
  };

  return (
    <div className={style.headers_wrapper}>
      <div style={{ display: 'flex' }}>
        <Title text={title} className={style.title} />
        <Button
          variant="outlined"
          size="sm"
          className={style.delete_btn}
          onClick={addHeader}
        >
          +
        </Button>
      </div>
      {items?.map((item, index) => (
        <div key={index} className={style.wrapper_input}>
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
            className={style.header_input}
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
            className={style.header_input}
          />
          <Button
            variant="outlined"
            size="sm"
            className={style.delete_btn}
            onClick={() => deleteHeader(index)}
          >
            -
          </Button>
        </div>
      ))}
    </div>
  );
};

export { KeyValueBlock };
