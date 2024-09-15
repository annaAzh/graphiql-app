import { rubik_doodle } from 'shared/styles/fonts/fonts';
import { cookies } from 'next/headers';
import style from './styles/Not-found.module.scss';
import textEN from '../../../locales/en/default.json';
import textRU from '../../../locales/ru/default.json';
import clsx from 'clsx';

const NotFound = () => {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value;

  return (
    <div className={clsx(style.wrapper, rubik_doodle.className)}>
      {locale && locale !== 'en' ? textRU.NotFound : textEN.NotFound}
    </div>
  );
};

export default NotFound;
