import { FC, useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Button } from 'shared/components';
import { RequestGraphQLData } from 'shared/types/graphQl';
import style from '../GraphQlPlayground.module.scss';

type Props = {
  watch: UseFormWatch<RequestGraphQLData>;
  onClick: () => void;
  setValue: UseFormSetValue<RequestGraphQLData>;
};

export const SDLInput: FC<Props> = ({ watch, onClick, setValue }) => {
  const baseUrl = watch('baseUrl');
  const [sdlUrl, setSdlUrl] = useState<string>(`${baseUrl}?sdl`);

  useEffect(() => {
    if (baseUrl) {
      setSdlUrl(`${baseUrl}?sdl`);
    } else {
      setSdlUrl(`?sdl`);
    }
  }, [baseUrl]);

  useEffect(() => {
    if (sdlUrl !== baseUrl) {
      setValue('baseUrl', sdlUrl.replace(/\?sdl/, ''));
    }
  }, [sdlUrl]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.includes('?sdl')) {
      value += '?sdl';
    }
    setSdlUrl(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className={style.url_wrapper} style={{ marginTop: '6px' }}>
      <input
        placeholder="https://url..."
        value={sdlUrl}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
        type="text"
        className={style.input}
      />
      <Button variant="outlined" size="lg" type="button" onClick={onClick}>
        docs
      </Button>
    </div>
  );
};
