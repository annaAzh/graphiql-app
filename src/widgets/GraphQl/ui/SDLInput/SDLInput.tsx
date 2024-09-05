import { FC, useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { Button } from 'shared/components';
import { RequestGraphQLData } from 'shared/types/graphQl';
import style from '../GraphQlPlayground.module.scss';

type Props = {
  watch: UseFormWatch<RequestGraphQLData>;
  onClick: () => void;
};

export const SDLInput: FC<Props> = ({ watch, onClick }) => {
  const [sdlUrl, setSdlUrl] = useState<string>('');

  useEffect(() => {
    const baseUrl = watch('baseUrl');
    if (baseUrl) {
      setSdlUrl(`${baseUrl}?sdl`);
    }
  }, [watch]);

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
      <Button variant="outlined" size="sm" type="button" onClick={onClick}>
        get docs
      </Button>
    </div>
  );
};
