import { rubik_doodle } from 'shared/styles/fonts/fonts';
import style from './styles/Not-found.module.scss';
import clsx from 'clsx';

const NotFound = () => {
  return (
    <div className={clsx(style.wrapper, rubik_doodle.className)}>
      {`page hasn't been found`}
    </div>
  );
};

export default NotFound;
