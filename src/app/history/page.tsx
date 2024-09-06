import { HistoryList } from 'widgets/HistoryList';
import style from './HistoryPage.module.scss';
import { Title } from 'shared/components';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Path } from 'shared/types/path';

const HistoryPage = () => {
  const cookie = cookies();
  const user = cookie.get('user');

  if (!user) redirect(Path.MAIN);

  return (
    <div className={style.historyPage}>
      <Title>History</Title>
      <HistoryList />
    </div>
  );
};

export default HistoryPage;
