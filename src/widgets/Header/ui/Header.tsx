'use client';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from 'shared/assets/img/logo.jpg';
import Link from 'next/link';
import { Path } from 'shared/types/path';
import { Button } from 'shared/components';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
        <Image src={Logo} alt="logo" priority width={180} height={55} />
      </Link>
      <div className={styles.dashboard}>
        <select defaultValue={'en'}>
          <option value={'en'}>EN</option>
          <option value={'ru'}>RU</option>
        </select>
        <Button size="lg">
          <Link href={Path.SIGN_UP}>Sign Up</Link>
        </Button>
        <Button size="lg">
          <Link href={Path.SIGN_IN}>Sign In</Link>
        </Button>
      </div>
    </header>
  );
};
