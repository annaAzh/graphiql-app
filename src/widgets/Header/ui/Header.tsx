'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from 'shared/assets/img/logo.jpg';
import Link from 'next/link';
import { Path } from 'shared/types/path';
import { Button, Notification } from 'shared/components';
import styles from './Header.module.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logoutUser } from 'shared/lib/api';
import { useCookies } from 'react-cookie';

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLogOut, changeIsLogOut] = useState<boolean>(false);
  const [cookies, , removeCookie] = useCookies<string>(['user']);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (!cookies.user && user) {
      logoutUser();
      changeIsLogOut(true);
      setTimeout(() => {
        changeIsLogOut(false);
      }, 3000);
    }
  }, [user, cookies.user]);

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

  const onClickLogOut = () => {
    removeCookie('user');
  };

  return (
    <header className={`${styles.header} ${isScrolled && styles.scrollHeader}`}>
      {isLogOut && <Notification error="You are out of the system!" />}
      <Link href={Path.MAIN}>
        <Image src={Logo} alt="logo" priority width={170} height={55} />
      </Link>
      <div className={styles.dashboard}>
        <select defaultValue={'en'}>
          <option value={'en'}>EN</option>
          <option value={'ru'}>RU</option>
        </select>
        {cookies.user && user ? (
          <>
            <Button size="lg">
              <Link href={Path.MAIN}>Main Page</Link>
            </Button>
            <Button size="lg" onClick={onClickLogOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button size="lg">
              <Link href={Path.SIGN_IN}>Sign In</Link>
            </Button>
            <Button size="lg">
              <Link href={Path.SIGN_UP}>Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
