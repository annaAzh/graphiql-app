'use client';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { auth } from 'shared/lib/api';
import { Path } from 'shared/types/path';
import { Button, Title } from 'shared/components';
import styles from './Main.module.scss';

export const Main = () => {
  const [user] = useAuthState(auth);
  const name = user?.displayName;
  const { t } = useTranslation();

  return (
    <>
      <Title size="h1">
        {!name ? t('Welcome') : `${t('WelcomeBack')}, ${name}!`}
      </Title>
      <div className={styles.containerButtons}>
        {user ? (
          <>
            <Link href={Path.REST}>
              <Button variant="secondary">{t('REST')}</Button>
            </Link>
            <Link href={Path.GRAPH}>
              <Button>{t('GraphiQL')}</Button>
            </Link>
            <Link href={Path.HISTORY}>
              <Button variant="secondary">{t('History')}</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href={Path.SIGN_IN}>
              <Button>{t('SignIn')}</Button>
            </Link>
            <Link href={Path.SIGN_UP}>
              <Button>{t('SignUp')}</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};
