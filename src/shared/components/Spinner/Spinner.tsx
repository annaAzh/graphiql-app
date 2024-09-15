'use client';
import { FC } from 'react';
import svgSpinner from '../../assets/svg/spinner.svg';
import styles from './Spinner.module.scss';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const Spinner: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.spinner}>
      <h2>{t('Loading')}</h2>
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
