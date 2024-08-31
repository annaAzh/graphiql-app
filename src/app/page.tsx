import Link from 'next/link';
import style from './styles/MainPage.module.scss';
import { Path } from 'shared/types/path';
import { Button } from 'shared/components';

const Home = () => {
  return (
    <main className={style.main}>
      <Button>
        <Link href={Path.REST}>REST Client</Link>
      </Button>
      <Button>
        <Link href={Path.GRAPH}>GRAPHQL</Link>
      </Button>
      <Button>
        <Link href={Path.HISTORY}>history</Link>
      </Button>
    </main>
  );
};

export default Home;
