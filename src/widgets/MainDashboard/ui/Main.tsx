'use client';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'shared/lib/api';
import { Path } from 'shared/types/path';
import { Button, Title } from 'shared/components';
import styles from './Main.module.scss';

export const Main = () => {
  const [user] = useAuthState(auth);
  const name = user?.displayName;

  return (
    <>
      <Title size="h1">{`Welcome${name ? ` Back, ${name}` : ''}!`}</Title>
      <div className={styles.containerButtons}>
        {user ? (
          <>
            <Button variant="secondary">
              <Link href={Path.REST}>REST Client</Link>
            </Button>
            <Button>
              <Link href={Path.GRAPH}>GraphiQL Client</Link>
            </Button>
            <Button variant="secondary">
              <Link href={Path.HISTORY}>History</Link>
            </Button>
          </>
        ) : (
          <>
            <Button>
              <Link href={Path.SIGN_IN}>Sign In</Link>
            </Button>
            <Button>
              <Link href={Path.SIGN_UP}>Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
};
