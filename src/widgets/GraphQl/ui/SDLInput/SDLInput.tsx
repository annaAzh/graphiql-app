import { FC, useEffect, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Button } from 'shared/components';
import { RequestGraphQLData } from 'shared/types/graphQl';
import style from '../GraphQlPlayground.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  watch: UseFormWatch<RequestGraphQLData>;
  onClick: () => void;
  setValue: UseFormSetValue<RequestGraphQLData>;
};

export const SDLInput: FC<Props> = ({ watch, onClick, setValue }) => {
  const url = watch('url');
  const { t } = useTranslation();
  const [sdlUrl, setSdlUrl] = useState<string>(`${url}?sdl`);

  useEffect(() => {
    if (url) {
      setSdlUrl(`${url}?sdl`);
    } else {
      setSdlUrl(`?sdl`);
    }
  }, [url]);

  useEffect(() => {
    if (sdlUrl !== url) {
      setValue('url', sdlUrl.replace(/\?sdl/, ''));
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
        data-testid="sdl_input"
        placeholder="https://url..."
        value={sdlUrl}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
        type="text"
        className={style.input}
      />
      <Button
        data-testid="get-docs"
        variant="outlined"
        size="lg"
        type="button"
        onClick={onClick}
      >
        {t('docs')}
      </Button>
    </div>
  );
};
