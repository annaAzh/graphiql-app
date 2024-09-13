'use client';
import { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import Image from 'next/image';
import Logo from 'shared/assets/img/logo.jpg';
import { Path } from 'shared/types/path';
import { Button } from 'shared/components';
import { auth, logoutUser } from 'shared/lib/api';
import { ButtonLogOut } from 'features/LogOutUser';
import styles from './Header.module.scss';
import { LanguageChanger } from 'features/SwitchLanguage';
import { useTranslation } from 'react-i18next';

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [cookies] = useCookies<string>(['user']);
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  useEffect(() => {
    if (!cookies.user && user) {
      logoutUser();
    }
  }, [cookies.user, user]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled && styles.scrollHeader}`}>
      <Link href={Path.MAIN}>
        <Image src={Logo} alt="logo" priority width={170} height={55} />
      </Link>
      <div className={styles.dashboard}>
        <LanguageChanger />
        {user ? (
          <>
            <Link href={Path.MAIN}>
              <Button size="lg">{t('Main')}</Button>
            </Link>
            <ButtonLogOut />
          </>
        ) : (
          <>
            <Link href={Path.SIGN_IN}>
              <Button size="lg">{t('SignIn')}</Button>
            </Link>
            <Link href={Path.SIGN_UP}>
              <Button size="lg">{t('SignUp')}</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};
