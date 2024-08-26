import Link from 'next/link';
import style from './styles/MainPage.module.scss';
import { Path } from 'shared/types/path';

const Home = () => {
  return (
    <main className={style.main}>
      <Link href={Path.REST} className="common-btn">
        REST Client
      </Link>
      <Link href={Path.GRAPH} className="common-btn">
        GRAPHQL
      </Link>
    </main>
  );
};

export default Home;
