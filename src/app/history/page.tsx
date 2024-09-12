import { HistoryList } from 'widgets/HistoryList';
import { Title } from 'shared/components';
import style from './HistoryPage.module.scss';

const HistoryPage = () => {
  return (
    <div className={style.historyPage}>
      <Title>History</Title>
      <HistoryList />
    </div>
  );
};

export default HistoryPage;
