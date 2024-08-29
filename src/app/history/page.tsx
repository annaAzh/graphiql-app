import { HistoryList } from 'widgets/HistoryList';
import style from './HistoryPage.module.scss';
import { Title } from 'shared/components';

const HistoryPage = () => {
  return (
    <div className={style.historyPage}>
      <Title>History</Title>
      <HistoryList />
    </div>
  );
};

export default HistoryPage;
