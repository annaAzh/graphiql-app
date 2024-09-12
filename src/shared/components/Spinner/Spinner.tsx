'use client';
import { FC } from 'react';
import svgSpinner from '../../assets/svg/spinner.svg';
import styles from './Spinner.module.scss';
import Image from 'next/image';

export const Spinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <h2>Loading...</h2>
      <Image
        src={svgSpinner}
        alt="spinner"
        priority={false}
        width={250}
        height={250}
      />
    </div>
  );
};
