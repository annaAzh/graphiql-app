'use client';
import { FC } from 'react';
import Logo from '../../../shared/assets/img/logo.jpg';
import styles from './Header.module.scss';
import Image from 'next/image';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Image src={Logo} alt="logo" priority={true} width={210} height={70} />
    </header>
  );
};
