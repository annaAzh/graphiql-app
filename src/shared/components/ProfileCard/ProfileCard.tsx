'use client';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import styles from './ProfileCard.module.scss';

interface ProfileCardProps {
  name: string;
  src: string;
}
export const ProfileCard: FC<ProfileCardProps> = ({ name, src }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.profileCard}>
      <Image src={src} alt={name} width={200} height={200} />
      <p>{t(`DevDescription${name}`)}</p>
    </div>
  );
};
